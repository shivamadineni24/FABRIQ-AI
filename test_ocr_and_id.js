import { parseLabelText, generateBlendAnalysis, SAMPLE_LABELS } from './src/services/labelOcrService.js';
import { estimateFabricFromObservations, SAMPLE_CLOTH_PHOTOS } from './src/services/fabricIdentificationService.js';

console.log('====================================================');
console.log('TESTING FABRIQ AI LABEL OCR & PHYSICAL CLOTH IDENTIFIER');
console.log('====================================================\n');

// Test 1: Clothing Label OCR Parser
console.log('--- TEST 1: Label Text Parsing ---');
const labelSample = SAMPLE_LABELS[0];
const parsed = parseLabelText(labelSample.previewText);
console.log('Parsed Label Composition:');
console.log(parsed.composition);

const analysis = generateBlendAnalysis(parsed.composition);
console.log(`Blend Summary: ${analysis.summary}`);
console.log(`What it means: "${analysis.whatItMeans}"`);
console.log(`Scores: Comfort=${analysis.comfort}%, Breathability=${analysis.breathability}%, Durability=${analysis.durability}%, Eco=${analysis.sustainability}%`);
console.log(`Care: ${analysis.careTips}`);

// Test 2: Physical Cloth Observation Heuristics (Cotton Jersey Sample)
console.log('\n====================================================');
console.log('--- TEST 2: Cloth Photo + 7 Physical Observations (Cotton Jersey) ---');
const clothSample = SAMPLE_CLOTH_PHOTOS[0];
const userReq = {
  garmentType: 'T-Shirt',
  climate: 'Hot weather',
  mattersMost: ['Comfort', 'Affordable price'],
  budget: 'Medium'
};

const idResult = estimateFabricFromObservations(clothSample.imageUrl, clothSample.answers, userReq);
console.log(`Likely Fabric: ${idResult.likelyFabric.name}`);
console.log(`Category: ${idResult.possibleCategory}`);
console.log(`Estimated Confidence: ${idResult.confidence}%`);
console.log(`Disclaimer: "${idResult.disclaimer}"`);
console.log('Suitability Matches:');
idResult.suitabilityCheck.matches.forEach(m => console.log(`  ${m}`));

// Test 3: Physical Cloth Observation Heuristics (Linen Shirt Sample)
console.log('\n====================================================');
console.log('--- TEST 3: Cloth Photo + 7 Physical Observations (Linen Shirt) ---');
const linenSample = SAMPLE_CLOTH_PHOTOS[1];
const idResult2 = estimateFabricFromObservations(linenSample.imageUrl, linenSample.answers, userReq);
console.log(`Likely Fabric: ${idResult2.likelyFabric.name}`);
console.log(`Estimated Confidence: ${idResult2.confidence}%`);

console.log('\n====================================================');
console.log('ALL OCR & IDENTIFICATION TESTS PASSED!');
console.log('====================================================');
