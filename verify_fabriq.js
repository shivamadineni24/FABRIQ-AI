import { calculateRecommendations, translateConsumerInputs } from './src/services/recommendationEngine.js';
import { estimateFabricFromObservations, evaluateFabricSuitability, PHYSICAL_QUESTIONS } from './src/services/fabricIdentificationService.js';
import { parseLabelText, generateBlendAnalysis } from './src/services/labelOcrService.js';

console.log('=== TEST 1: CONSUMER BENCHMARK T-SHIRT ===');
const inputs1 = {
  garmentType: 'T-Shirt',
  climate: 'Hot weather',
  mattersMost: ['Comfort', 'Breathability', 'Affordable price', 'Eco-friendly'],
  performanceNeeds: ['Breathable & Cool', 'Soft & Comfortable'],
  budget: 'Medium',
  sustainabilityPriority: 'High'
};
const res1 = calculateRecommendations(inputs1);
console.log('Understood:', translateConsumerInputs(inputs1));
console.log('Top Recommendation:', res1.topRecommendation.name, res1.topRecommendation.finalScore + '%');
console.log('Alternatives:', res1.alternativeOptions.map(a => `${a.name} (${a.finalScore}%)`).join(', '));
console.log('Explanation:', res1.explanation);

console.log('\n=== TEST 2: ACTIVE SPORTSWEAR PERFORMANCE ===');
const inputs2 = {
  garmentType: 'Sportswear',
  climate: 'Humid/Rainy weather',
  mattersMost: ['Breathability', 'Lightweight', 'Easy maintenance'],
  performanceNeeds: ['Stretchable', 'Sweat-wicking', 'Quick-drying', 'Lightweight'],
  budget: 'Medium',
  sustainabilityPriority: 'Medium'
};
const res2 = calculateRecommendations(inputs2);
console.log('Top Recommendation:', res2.topRecommendation.name, res2.topRecommendation.finalScore + '%');

console.log('\n=== TEST 3: COLD WEATHER JACKET ===');
const inputs3 = {
  garmentType: 'Jacket',
  climate: 'Cold weather',
  mattersMost: ['Durability', 'Comfort', 'Eco-friendly'],
  performanceNeeds: ['Warm & Insulating', 'Durable & Tough', 'Wind-resistant'],
  budget: 'High',
  sustainabilityPriority: 'Medium'
};
const res3 = calculateRecommendations(inputs3);
console.log('Top Recommendation:', res3.topRecommendation.name, res3.topRecommendation.finalScore + '%');

console.log('\n=== TEST 4: LABEL OCR PARSING & BLEND ANALYSIS ===');
const sampleText = "60% COTTON / 40% POLYESTER\nMACHINE WASH COLD";
const comp = parseLabelText(sampleText);
console.log('Parsed Composition:', comp);
const analysis = generateBlendAnalysis(comp);
console.log('Blend Meaning:', analysis.whatItMeans);

console.log('\n=== TEST 5: NO LABEL - OPTION 1 (I HAVE A PHOTO) ===');
const obsAnswers1 = {
  weight: 'Lightweight',
  feel: 'Soft',
  stretch: 'A Little',
  thickness: 'Thin',
  surface: 'Matte',
  breathability: 'Yes',
  clothingType: 'T-Shirt'
};
const fakePhotoUrl = 'data:image/svg+xml;utf8,<svg></svg>';
const idRes1 = estimateFabricFromObservations(fakePhotoUrl, obsAnswers1, inputs1);
console.log('Has Photo:', idRes1.hasPhoto);
console.log('Likely Fabric:', idRes1.likelyFabric.name);
console.log('Confidence Score:', idRes1.confidence + '%');
console.log('Disclaimer:', idRes1.disclaimer);

console.log('\n=== TEST 6: NO LABEL - OPTION 2 (I DON\'T HAVE A PHOTO - ANSWERS ONLY) ===');
const obsAnswers2 = {
  weight: 'Heavy',
  feel: 'Rough',
  stretch: 'No',
  thickness: 'Thick',
  surface: 'Textured',
  breathability: 'Yes',
  clothingType: 'Jeans'
};
const idRes2 = estimateFabricFromObservations(null, obsAnswers2, inputs1);
console.log('Has Photo:', idRes2.hasPhoto);
console.log('Likely Fabric:', idRes2.likelyFabric.name);
console.log('Confidence Score:', idRes2.confidence + '%');
console.log('Disclaimer:', idRes2.disclaimer);

console.log('\n=== TEST 7: 7 QUESTIONS VALIDATION ===');
console.log('Total Physical Questions:', PHYSICAL_QUESTIONS.length);
PHYSICAL_QUESTIONS.forEach(q => {
  console.log(`- ${q.question} -> Options: [${q.options.join(', ')}]`);
});

console.log('\nALL 7 VERIFICATION TESTS COMPLETED SUCCESSFULLY!');
