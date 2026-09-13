import { FABRICS_DATASET } from './src/data/fabrics.js';
import { calculateRecommendations } from './src/services/recommendationEngine.js';

console.log('====================================================');
console.log('TESTING FABRIQ AI CONSUMER REDESIGN & ML ENGINE');
console.log('====================================================\n');

// Test 1: Exact Benchmark Demo Scenario from Section 19:
// User chooses:
// Garment: T-Shirt
// Climate: Hot & Humid
// Priority: Comfort + Affordable + Eco-friendly
// Budget: Medium
// Durability: Medium
const benchmarkInputs = {
  garmentType: 'T-Shirt',
  climate: 'Hot & humid weather',
  mattersMost: ['Comfortable', 'Affordable', 'Eco-friendly', 'Breathable'],
  budget: 'Medium',
  sustainabilityPriority: 'High',
  durabilityExpectation: 'Normal'
};

const result1 = calculateRecommendations(benchmarkInputs);

console.log('--- TEST 1: Section 19 Benchmark Demo Flow ---');
console.log('What FABRIQ AI Understood:');
result1.understoodRequirements.forEach(pt => console.log(`  ✓ ${pt}`));

console.log(`\n🥇 Best Match: ${result1.topRecommendation.name} — ${result1.topRecommendation.finalScore}% Match`);
console.log(`  Fiber Type: ${result1.topRecommendation.fiberType}`);
console.log(`  What is it: "${result1.topRecommendation.whatIsIt}"`);
console.log('  Why Suitable:');
result1.topRecommendation.whySuitable.forEach(s => console.log(`    ${s}`));
console.log('  Things to consider:');
result1.topRecommendation.thingsToConsider.forEach(c => console.log(`    ${c}`));

console.log('\nDynamic Consumer Explanation:');
console.log(`  "${result1.explanation}"`);

console.log('\nAlternative Options:');
result1.alternativeOptions.forEach((alt, idx) => {
  console.log(`  ${idx === 0 ? '🥈' : idx === 1 ? '🥉' : '4th'} ${alt.name} — ${alt.finalScore}% Match (${alt.simpleLabels.comfort} comfort, ${alt.simpleLabels.sustainability} eco)`);
});

console.log('\nTrade-Off Leaders:');
console.log(`  Best For You: ${result1.tradeOffAnalysis.bestForYou.name}`);
console.log(`  Most Sustainable: ${result1.tradeOffAnalysis.mostSustainable.name} (${result1.tradeOffAnalysis.mostSustainable.scores.sustainability}%)`);
console.log(`  Most Comfortable: ${result1.tradeOffAnalysis.mostComfortable.name} (${result1.tradeOffAnalysis.mostComfortable.scores.comfort}%)`);
console.log(`  Most Affordable: ${result1.tradeOffAnalysis.mostAffordable.name} (${result1.tradeOffAnalysis.mostAffordable.scores.costScore}%)`);

console.log('\nExplainable AI Factor Weights:');
result1.factorContributions.forEach((f, idx) => {
  console.log(`  ${idx + 1}. ${f.label} — ${f.weight}%`);
});

// Test 2: Winter Outerwear (Jacket / Cold weather / Long-lasting / High budget)
console.log('\n====================================================');
console.log('--- TEST 2: Winter Jacket Scenario ---');
const winterInputs = {
  garmentType: 'Jacket',
  climate: 'Cold weather',
  mattersMost: ['Long-lasting', 'Comfortable', 'Eco-friendly'],
  budget: 'High',
  sustainabilityPriority: 'Medium',
  durabilityExpectation: 'Long-lasting'
};

const result2 = calculateRecommendations(winterInputs);
console.log(`🥇 Best Match: ${result2.topRecommendation.name} — ${result2.topRecommendation.finalScore}% Match`);
console.log(`  🥈 Runner Up: ${result2.alternativeOptions[0].name} — ${result2.alternativeOptions[0].finalScore}% Match`);

// Test 3: Budget Sportswear (Sportswear / Hot & humid / Breathable / Affordable)
console.log('\n====================================================');
console.log('--- TEST 3: Budget Sportswear Scenario ---');
const sportInputs = {
  garmentType: 'Sportswear',
  climate: 'Hot & humid weather',
  mattersMost: ['Breathable', 'Lightweight', 'Affordable', 'Easy to maintain'],
  budget: 'Low',
  sustainabilityPriority: 'Low',
  durabilityExpectation: 'Normal'
};

const result3 = calculateRecommendations(sportInputs);
console.log(`🥇 Best Match: ${result3.topRecommendation.name} — ${result3.topRecommendation.finalScore}% Match`);
console.log(`  🥈 Runner Up: ${result3.alternativeOptions[0].name} — ${result3.alternativeOptions[0].finalScore}% Match`);

console.log('\n====================================================');
console.log('ALL TESTS COMPLETED SUCCESSFULLY!');
console.log('====================================================');
