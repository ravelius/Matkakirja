// Commonsin Artist/Attribution/LicenseShortName-kenttien siistiminen
// lähdemerkinnäksi. Yhteinen: tools/lisaa-tekijat.mjs (pakettien
// lähdekentät) ja tools/hae-commons-tekijat.mjs (js/packs/commons-tekijat.js).

/**
 * Commonsin Artist-kentästä pelkkä nimi.
 *
 * Kenttä on vapaata HTML:ää, ja kuvaajat kirjoittavat siihen mitä
 * sattuu: kokonaisia käyttöehtoja ("This Photo was taken by X. Feel
 * free to use it…"), allekirjoituksia aikaleimoineen, tiedostonimiä ja
 * kotipaikkoja. Lähdemerkintään kuuluu vain nimi — muu tekee siitä
 * lukukelvottoman ja katkeaisi kesken.
 */
export function siisti(arvo) {
  // Tagit poistetaan ilman välilyöntiä: nimi voi olla pilkottu useaan
  // span-elementtiin kirjainten värittämiseksi ("A"+"ngelus"), ja
  // välilyönti tekisi siitä "A ngelus". Rivinvaihdot ja peräkkäiset
  // linkit erotetaan erikseen, ettei nimiä liimaudu yhteen.
  let s = (arvo ?? '')
    .replace(/<br\s*\/?>|<\/(p|div|li|tr)>/gi, ' ')
    .replace(/<\/a>\s*<a\b[^>]*>/gi, ', ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // "File:jokin.jpg : Nimi ..." — tiedostonimi edellä
  s = s.replace(/^File:[^:]+:\s*/i, '');
  // "This Photo was taken by X", "Photo by X", "Foto: X", "© X"
  s = s.replace(/^(this (photo|image|picture) (was )?(taken|created) by|photo(graph)? by|foto:|bild:|©)\s*/i, '');
  /*
   * Ensimmäinen virke riittää: loppu on käyttöehtoja tai kiitoksia.
   *
   * Piste ei kuitenkaan aina lopeta virkettä. "Dr. Ondřej Havelka"
   * katkesi muotoon "Dr" ja "M. Fatih Morgül" muotoon "M", eli tulos
   * oli suoraan tämän tiedoston oman aikeen vastainen: nimen
   * katkaiseminen kesken on väärin juuri sitä kohtaan, jota lisenssi
   * käskee nimetä.
   *
   * Piste ohitetaan, jos sitä edeltää yksittäinen alkukirjain tai
   * tunnettu titteli. Lista on lyhyt tarkoituksella — tuntematon lyhenne
   * on harvinaisempi kuin kokonainen virke, ja liian salliva sääntö
   * päästäisi käyttöehdot takaisin nimeen.
   */
  /*
   * "Sgt" ja lyhenteet: "U.S. Army photo by Staff Sgt. Luke Wilson"
   * katkesi muotoon "U.S", koska piste "U.S." jälkeen luettiin virkkeen
   * lopuksi. Tulos näytti nimeltä eikä herättänyt epäilystä — sama
   * vika kuin muutkin tämän tiedoston hiljaiset katkaisut.
   */
  const EI_KATKAISE = /(?:^|\s)(?:[A-ZÅÄÖ]|[A-Z]\.[A-Z]|Dr|Mr|Mrs|Ms|Prof|St|Sr|Jr|Fr|Sta|Ing|Rev|Hr|Mme|Mlle|Sgt|Cpl|Lt|Capt|Maj|Col)$/;
  for (const osuma of [...s.matchAll(/\.\s|\s\.\s/g)]) {
    if (EI_KATKAISE.test(s.slice(0, osuma.index))) continue;
    s = s.slice(0, osuma.index);
    break;
  }
  s = s.trim();

  /*
   * Sama nimi kahdesti peräkkäin ilman erotinta.
   *
   * Tagit poistetaan yllä ilman välilyöntiä, jotta pilkottu nimi ei
   * hajoa. Sivuvaikutus: jos sama teksti on kahdessa elementissä
   * ("Unknown author" kahdesti), tuloksena on "Unknown authorUnknown
   * author". Se näkyi pelaajalle asti.
   */
  s = s.replace(/^(.{3,40}?)\1$/, '$1');
  // Allekirjoituksen aikaleima ("Nimi 11:52, 3 July 2012 (UTC)")
  s = s.replace(/\s+\d{1,2}:\d{2},.*$/, '');
  // Kotipaikka ei kuulu nimeen ("Tony Hisgett from Birmingham, UK")
  s = s.replace(/\s+from\s+.*$/i, '');
  // Wikipedia-tunnus suluissa ("J Williams (= Hammy07 at en.wikipedia)")
  s = s.replace(/\s*\((=\s*)?[^)]*\b(at|wikipedia|wikimedia)\b[^)]*\)/i, '');
  // Sama ilman sulkeita ("Shayanshaukat at English Wikipedia")
  s = s.replace(/\s+at\s+\S+\s*wikipedia\s*$/i, '');
  // Elinvuodet eivät kuulu lähdemerkintään ("Lucien Roy (d. 1941)")
  s = s.replace(/\s*\((k\.|d\.|s\.|b\.|\d{4})[^)]*\)\s*$/i, '');
  // Verkko-osoite ei ole nimi
  s = s.replace(/,?\s*(https?:\/\/|www\.)\S*/gi, '');
  s = s.replace(/[,;.]\s*$/, '').replace(/\s+\.$/, '').trim();

  // Attribution voi olla kokonainen lause: "Kuvan nimi by Tekijä"
  // (geograph.org.uk) tai "Photo: Tekijä". Nimi on jälkimmäinen osa.
  const bySijainti = s.match(/^(.+?)\s+by\s+(.{2,40})$/i);
  if (bySijainti) s = bySijainti[2].trim();

  // Useita tekijöitä: nimetään ensimmäinen ja todetaan muut. Nimien
  // katkaiseminen kesken olisi väärin juuri sitä kohtaan, jota
  // lisenssi käskee nimetä.
  const osat = s.split(/,\s*/).filter(Boolean);
  if (osat.length > 2 || s.length > 44) {
    return osat.length > 1 ? `${osat[0]} ym.` : osat[0] ?? '';
  }
  return s;
}

