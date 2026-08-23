/*
 * Herokuvien kuvakulmat yhdessä paikassa.
 *
 * Kuvakulma oli aiemmin kopioitu jokaiseen työlistaan (hero-tyolista-
 * 3..20). Kun omistaja kalibroi kulmaa 24.8.2026, kopioita olisi
 * pitänyt muuttaa parikymmentä — sama vika kuin peilin nimeämis-
 * säännöllä aikoinaan. Nyt sääntö on täällä ja työlistat tuovat sen.
 *
 * ------------------------------------------------------------------
 * MIKSI KULMIA ON KOLME
 * ------------------------------------------------------------------
 * Oodin ensimmäinen viitekuvallinen ajo epäonnistui tavalla, joka ei
 * ollut rakennuksen vika: rakennus oli oikein, mutta se oli sijoitettu
 * kaupunkiin väärin (omistaja 24.8.2026: "Oodi sijoittuu kaupunkiin
 * väärin"). Vakiokulma näyttää laajan kaupunkinäkymän, ja JOKAINEN
 * näytetty kortteli on mahdollisuus sijoittaa kohde väärään
 * ympäristöön. Mitä vähemmän kaupunkia näkyy, sitä vähemmän siinä voi
 * mennä pieleen.
 *
 * Toinen ajo tehtiin katutasosta ja aivan läheltä. Rakennus oli oikein
 * ja ympäristö poissa tieltä, mutta omistaja: "Tuo on liian matalalta.
 * Mutta pidetään tämä." Kuva siis kelpaa, mutta kulma ei ole se, jota
 * muille tehdään.
 *
 * OMISTAJAN PÄÄTÖS 24.8.2026: oletus on silti VAKIO — "pidä
 * alkuperäinen korkeus ja etäisyys, se on visuaalisesti paras".
 * Tämä on tietoinen valinta: laaja näkymä on kaunein, ja Tampereen
 * hyväksytty erä tehtiin juuri sillä. Sijoitusriski jää siis voimaan
 * ja se hyväksytään — viitekuvat ankkuroivat rakennuksen, vaikka
 * ympäristö on yhä mallin varassa. LAHI ja TIUKKA ovat käytettävissä
 * silloin, kun jokin kohde osoittautuu toistuvasti sijoitusvirheiden
 * lähteeksi.
 */

/*
 * VAKIO — OLETUS. Kohde kattojen korkeudelta, laaja kaupunki takana.
 * Visuaalisesti paras ja koko herokuvasarjan vakiintunut ilme.
 */
export const VAKIO =
  " Shot from a LOW ELEVATED viewpoint at rooftop height, roughly level"
  + " with the landmark's midpoint, camera tilted only gently downward"
  + ' (about 15 degrees): the landmark towers large and dominant in the'
  + ' foreground, its facade fully visible, while streets with people'
  + ' directly below and the city behind stretch into the distance.'
  + ' Professional full-frame drone photograph, natural colours, crisp'
  + ' detail, realistic atmosphere, no stylization. Absolutely no text,'
  + ' no watermark, no borders.';

/*
 * LAHI — varakulma sijoitusvirheiden varalle. Kohde täyttää kuvan,
 * ympäristöä vain reunoilla.
 * Kamera on ihmisen silmänkorkeuden yläpuolella mutta selvästi
 * kattojen alapuolella, noin toisen kerroksen tasolla, ja katsoo
 * kohdetta lähes vaakasuoraan.
 */
export const LAHI =
  ' Shot from slightly above eye level, about the height of a second'
  + ' storey and well below the rooftops, from fairly close range, the'
  + ' camera looking almost horizontally at the building with only a'
  + ' slight upward tilt. The building dominates the frame and its'
  + ' facade and materials read clearly, but the whole of it stays'
  + ' within the picture. Around it, only the immediate surroundings:'
  + ' the street or square directly in front with people at human'
  + ' scale, and the neighbouring buildings that stand right beside it'
  + ' — never a wide city panorama and never a distant skyline.'
  + ' Professional full-frame photograph, natural colours, crisp'
  + ' detail, realistic atmosphere, no stylization. Absolutely no text,'
  + ' no watermark, no borders.';

/*
 * TIUKKA — katutaso, kohde rajautuu kuvan reunoihin. Tämä on Oodin
 * toisen ajon kulma. Käytä vain kun kohteen ympäristö on niin vaikea
 * tai niin vähän kuvattu, ettei sitä kannata näyttää lainkaan.
 */
export const TIUKKA =
  ' Shot from street level or only slightly above, from close range, the'
  + ' camera looking almost horizontally at the building and tilted up'
  + ' very slightly. The building FILLS the frame and is cropped by the'
  + ' edges: its facade and materials are the subject, seen close enough'
  + ' that the surface texture reads clearly. Only a narrow strip of the'
  + ' surroundings is visible at the edges and behind — just enough to'
  + ' place it, never a wide city panorama. Professional full-frame'
  + ' photograph, natural colours, crisp detail, realistic atmosphere,'
  + ' no stylization. Absolutely no text, no watermark, no borders.';

/**
 * Promptin runko. Oletuskulma on VAKIO.
 *
 * @param {string} kohde      mitä kuvataan, englanniksi
 * @param {string} kuvaus     rakennuksen muoto ja materiaalit
 * @param {string} ymparisto  mitä ympärillä näkyy
 * @param {string} kulma      VAKIO | LAHI | TIUKKA
 */
export const prompti = (kohde, kuvaus, ymparisto, kulma = VAKIO) =>
  `A photorealistic photograph of ${kohde}, the building dominating the`
  + ` frame: ${kuvaus}. Immediately around it: ${ymparisto}.${kulma}`;
