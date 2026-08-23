/* KERTAKAYTTOINEN UUSINTA: Nasilinna. EI committoida. */
const KUVAKULMA =
  " Shot from a LOW ELEVATED viewpoint at rooftop height, roughly level"
  + " with the landmark's midpoint, camera tilted only gently downward"
  + ' (about 15 degrees): the landmark towers large and dominant in the'
  + ' foreground, its facade fully visible, while streets with people'
  + ' directly below and the city behind stretch into the distance.'
  + ' Professional full-frame drone photograph, natural colours, crisp'
  + ' detail, realistic atmosphere, no stylization. Absolutely no text,'
  + ' no watermark, no borders.';
const p = (kohde, kuvaus, ymparisto) =>
  `A photorealistic wide photograph of ${kohde} dominating the`
  + ` foreground: ${kuvaus}. Behind and below it, smaller:`
  + ` ${ymparisto}.${KUVAKULMA}`;
export const TYOLISTA = [
  {
    id: 'tampere-aamu',
    tiedosto: 'hero-tampere-aamu.png',
    kaupunki: 'tampere',
    prompti: "A photorealistic wide photograph of the Nasilinna palace on its hill above the lake in Tampere dominating the foreground: the COMPACT two-storey neo-baroque villa, only about seven windows wide and almost square in plan, no long wings and no extra side pavilions, of plastered brick painted pale ochre with white pilasters, carved window surrounds and a heavy cornice, a projecting centre bay crowned by a curved gable and a stone balustrade with urns, tall arched windows and a wide terrace with a stone staircase on the park front, low early morning sun from the east along the pale wall so that every moulding throws a long shadow; there is only ONE such building in the picture, it is a modest hilltop villa and not a grand long palace and nothing rises behind its roofline. Behind and below it, smaller: the sloping park below with gravel paths, flower beds, old birches and a low iron railing, the camera standing on the palace side so that the terrace steps and a stone bench are in the foreground, a few early walkers as small figures on the paths, the red brick factory blocks and church towers of the town below the hill, and the wide grey water of the lake with a steamer at the quay and low wooded shores beyond. Shot from a LOW ELEVATED viewpoint at rooftop height, roughly level with the landmark's midpoint, camera tilted only gently downward (about 15 degrees): the landmark towers large and dominant in the foreground, its facade fully visible, while streets with people directly below and the city behind stretch into the distance. Professional full-frame drone photograph, natural colours, crisp detail, realistic atmosphere, no stylization. Absolutely no text, no watermark, no borders.",
    selite: '',
  },
];
