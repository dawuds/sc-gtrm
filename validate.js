#!/usr/bin/env node
/**
 * SC-GTRM Data Integrity Validator
 * Validates JSON data files for the SC Malaysia Technology Risk Management Guidelines (SC-GL/6-2023) repo.
 *
 * Usage: node validate.js [--verbose]
 */

const fs = require('fs');
const path = require('path');

const VERBOSE = process.argv.includes('--verbose');
let pass = 0, fail = 0, warn = 0;

function ok(msg) { pass++; if (VERBOSE) console.log(`  ✓ ${msg}`); }
function bad(msg) { fail++; console.error(`  ✗ FAIL: ${msg}`); }
function warning(msg) { warn++; console.warn(`  ⚠ WARN: ${msg}`); }

function loadJson(relPath) {
  const fullPath = path.join(__dirname, relPath);
  try {
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch (e) {
    bad(`Cannot parse ${relPath}: ${e.message}`);
    return null;
  }
}

function findJsonFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== '.git' && entry.name !== 'node_modules') {
      results.push(...findJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.json') && !entry.name.startsWith('package')) {
      results.push(fullPath);
    }
  }
  return results;
}

// ── Check 1: All JSON files parse ──
console.log('\n1. JSON Parse Integrity');
const jsonFiles = findJsonFiles(__dirname);
console.log(`   Found ${jsonFiles.length} JSON files`);
for (const f of jsonFiles) {
  try {
    JSON.parse(fs.readFileSync(f, 'utf8'));
    ok(`Parsed: ${path.relative(__dirname, f)}`);
  } catch (e) {
    bad(`Parse error in ${path.relative(__dirname, f)}: ${e.message}`);
  }
}

// ── Check 2: Control library integrity ──
console.log('\n2. Control Library Integrity');
const controls = loadJson('controls/library.json');
const domainsFile = loadJson('controls/domains.json');
if (controls) {
  const slugs = new Set();
  const domainSlugs = new Set();

  // Load domains — supports multiple formats:
  // 1. library.json has {domains: [{id, name}...]}
  // 2. domains.json has {domains: [{id, name}...]}
  // 3. domains.json is flat {domainId: {name, ...}} (SC-GTRM pattern)
  let domainSource = [];
  if (controls.domains && Array.isArray(controls.domains)) {
    domainSource = controls.domains;
  } else if (domainsFile) {
    if (domainsFile.domains && Array.isArray(domainsFile.domains)) {
      domainSource = domainsFile.domains;
    } else {
      // Flat object keyed by domain ID
      const keys = Object.keys(domainsFile).filter(k => !k.startsWith('_'));
      domainSource = keys.map(k => ({ id: k, name: (domainsFile[k] && domainsFile[k].name) || k }));
    }
  }

  if (domainSource.length === 0) {
    bad('No domains found in controls/library.json or controls/domains.json');
  } else {
    for (const d of domainSource) {
      const did = d.id || d.slug;
      if (!did) bad('Domain missing id/slug');
      else if (domainSlugs.has(did)) bad(`Duplicate domain: ${did}`);
      else { domainSlugs.add(did); ok(`Domain: ${did}`); }
    }
  }

  // Check controls
  if (controls.controls && Array.isArray(controls.controls)) {
    for (const c of controls.controls) {
      if (!c.slug) bad('Control missing slug');
      else if (slugs.has(c.slug)) bad(`Duplicate control slug: ${c.slug}`);
      else { slugs.add(c.slug); ok(`Control: ${c.slug}`); }

      if (!c.name) bad(`Control ${c.slug || '?'} missing name`);
      if (!c.domain) bad(`Control ${c.slug || '?'} missing domain`);
      else if (domainSlugs.size > 0 && !domainSlugs.has(c.domain)) bad(`Control ${c.slug} references unknown domain: ${c.domain}`);
      if (!c.description) warning(`Control ${c.slug || '?'} missing description`);
      if (!c.controlType) warning(`Control ${c.slug || '?'} missing controlType`);
      if (!c.keyActivities || c.keyActivities.length === 0) warning(`Control ${c.slug || '?'} has empty keyActivities`);
    }
    console.log(`   ${controls.controls.length} controls validated`);
  } else {
    bad('controls/library.json missing controls array');
  }

  // Check every domain has at least one control
  for (const d of domainSlugs) {
    const domainControls = (controls.controls || []).filter(c => c.domain === d);
    if (domainControls.length === 0) bad(`Domain ${d} has zero controls`);
    else ok(`Domain ${d} has ${domainControls.length} controls`);
  }
}

// ── Check 3: Domains file consistency ──
console.log('\n3. Domains File Consistency');
const domains = loadJson('controls/domains.json');
if (domains && controls) {
  const domainsFileIds = new Set((domains.domains || []).map(d => d.id));
  const libraryDomainIds = new Set((controls.domains || []).map(d => d.id));

  for (const id of domainsFileIds) {
    if (libraryDomainIds.has(id)) ok(`Domain ${id} consistent across files`);
    else warning(`Domain ${id} in domains.json but not in library.json`);
  }
  for (const id of libraryDomainIds) {
    if (!domainsFileIds.has(id)) warning(`Domain ${id} in library.json but not in domains.json`);
  }
}

// ── Check 4: Requirements reference valid domains ──
console.log('\n4. Requirements Domain References');
const reqDir = path.join(__dirname, 'requirements', 'by-domain');
if (fs.existsSync(reqDir)) {
  const reqFiles = fs.readdirSync(reqDir).filter(f => f.endsWith('.json'));
  const domainIds = controls ? new Set((controls.domains || []).map(d => d.id)) : new Set();
  for (const f of reqFiles) {
    const domainSlug = f.replace('.json', '');
    if (domainIds.has(domainSlug)) ok(`Requirements file ${f} matches domain`);
    else warning(`Requirements file ${f} has no matching domain in controls`);
  }
}

// ── Check 5: Evidence domain references ──
console.log('\n5. Evidence Domain References');
const evidence = loadJson('evidence/index.json');
if (evidence && evidence.domains) {
  const domainIds = controls ? new Set((controls.domains || []).map(d => d.id)) : new Set();
  const evidenceDomains = Array.isArray(evidence.domains) ? evidence.domains : Object.keys(evidence.domains);
  for (const ed of evidenceDomains) {
    const domainKey = typeof ed === 'string' ? ed : ed.id;
    if (domainKey && domainIds.has(domainKey)) ok(`Evidence domain ${domainKey} valid`);
    else if (domainKey) warning(`Evidence domain ${domainKey} not in controls`);
  }
}

// ── Check 6: Cross-reference integrity ──
console.log('\n6. Cross-Reference Integrity');
const rmitMapping = loadJson('cross-references/rmit-mapping.json');
const nistMapping = loadJson('cross-references/nist-mapping.json');
if (rmitMapping) {
  const mappings = rmitMapping.mappings || [];
  for (const m of mappings) {
    if (!m.iespDomain && !m.scGtrmDomain && !m.domain) warning('Cross-ref mapping missing domain field');
    else ok(`RMiT mapping: ${m.iespDomain || m.scGtrmDomain || m.domain}`);
  }
}
if (nistMapping) {
  const mappings = nistMapping.mappings || [];
  for (const m of mappings) {
    if (!m.iespDomain && !m.scGtrmDomain && !m.domain) warning('NIST mapping missing domain field');
    else ok(`NIST mapping: ${m.iespDomain || m.scGtrmDomain || m.domain}`);
  }
}

// ── Check 7: Risk register math ──
console.log('\n7. Risk Register Math');
const riskRegister = loadJson('risk-management/risk-register.json');
if (riskRegister) {
  const risks = riskRegister.risks || [];
  for (const r of risks) {
    if (r.likelihood && r.impact) {
      const expectedInherent = r.likelihood * r.impact;
      if (r.inherentRisk !== undefined && r.inherentRisk !== expectedInherent) {
        bad(`Risk ${r.id}: inherentRisk ${r.inherentRisk} !== likelihood(${r.likelihood}) × impact(${r.impact}) = ${expectedInherent}`);
      } else {
        ok(`Risk ${r.id}: inherent risk math correct`);
      }
    }
    if (r.residualLikelihood && r.residualImpact) {
      const expectedResidual = r.residualLikelihood * r.residualImpact;
      if (r.residualRisk !== undefined && r.residualRisk !== expectedResidual) {
        bad(`Risk ${r.id}: residualRisk ${r.residualRisk} !== ${r.residualLikelihood} × ${r.residualImpact} = ${expectedResidual}`);
      } else {
        ok(`Risk ${r.id}: residual risk math correct`);
      }
    }
  }
}

// ── Check 8: No empty arrays or strings ──
console.log('\n8. No Empty Arrays/Strings in Core Data');
function checkEmpty(obj, filePath, keyPath) {
  if (Array.isArray(obj)) {
    if (obj.length === 0) warning(`Empty array at ${filePath}:${keyPath}`);
    obj.forEach((item, i) => checkEmpty(item, filePath, `${keyPath}[${i}]`));
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      if (k.startsWith('_')) continue;
      if (typeof v === 'string' && v.trim() === '') warning(`Empty string at ${filePath}:${keyPath}.${k}`);
      checkEmpty(v, filePath, `${keyPath}.${k}`);
    }
  }
}
const coreFiles = ['controls/library.json', 'controls/domains.json', 'evidence/index.json'];
for (const f of coreFiles) {
  const data = loadJson(f);
  if (data) {
    checkEmpty(data, f, '$');
    ok(`Checked ${f} for empty values`);
  }
}

// ── Summary ──
console.log('\n' + '═'.repeat(50));
console.log(`Results: ${pass} passed, ${fail} failed, ${warn} warnings`);
console.log('═'.repeat(50));

if (fail > 0) {
  console.log('\n⛔ Validation FAILED');
  process.exit(1);
} else if (warn > 0) {
  console.log('\n⚠️  Validation PASSED with warnings');
  process.exit(0);
} else {
  console.log('\n✅ Validation PASSED');
  process.exit(0);
}
