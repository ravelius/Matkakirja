// OLAVINLINNAN KOHTAUKSET V3 (Linnanrakentaja 5.10.2026; omistaja hyväksyi äänet 14.0x, Pelikoodarin v3: _valmiit/linna-kohtaukset-v3).
// Siirtosepän datasäännöt 5.10. (sama rakennus.json TF 143:lle ja junalle 144):
//  1) kasikirjoitus = pulu-lenna + taulu (ei kohta-, repliikki- eikä reaktioaskeleita: vanha natiivi ei soita vanhoja repliikkejä päälle).
//  2) kuunnelma = [kertoja, keskustelu (yksi Text to Dialogue -otto, vuorot sekunteina WAV-masterista)]; ei Pulu-rivejä;
//     keskustelun nimi tyhjä (vanha natiivi piilottaa puhujarivin), uusi natiivi näyttää vuoron puhujan.
//     Vuoron valinnainen ilme (neutraali|vakava|hymy|huolestunut) valitsee puhujakuvan <henkilö-id>-<ilme> (Codex).
//  3) hahmo.reaktio ja taulu.kohdat jäävät (uusi natiivi: Pulu napautuksesta); hahmo.repliikit tyhjennetään.
//     Pulun entiset kuunnelmarivit siirtyvät taulun kohdiksi omine äänineen; kohde = napautuskohde (sijoitus.mjs muuntaa).
// GENEROITU: scratchpadin gen_v3.py Pelikoodarin ajat/*.json-tiedostoista; tekstit Päätoimittajan käsikirjoituksesta
// (docs/raportit/linna-kohtaukset-v2-20261005.md).

export const KOHTAUKSET_V3 = {
  laituri: {
    kertoja: "Laiturilla soutaja kiinnittää venettään, ja renki nostaa säkkejä rantaan. Vene oli saarilinnan elinehto: myöhemmin linnalla oli peräti yhdeksän suurta kavassia.",
    vuorot: [
      {"puhuja": "soutaja", "alku_s": 0.0, "loppu_s": 8.95, "teksti": "Kaikki tulee vesitse: kivi, kalkki, kala ja vouti. Ilman venettä tämä linna olisi pelkkä kivikasa saaressa.", "ilme": "neutraali"},
      {"puhuja": "renki", "alku_s": 9.57, "loppu_s": 16.11, "teksti": "Isoisä souti kiveä, kun linnaa rakennettiin. Proomuissa istui toista kymmentä haarniskamiestä vahdissa.", "ilme": "neutraali"},
      {"puhuja": "soutaja", "alku_s": 16.75, "loppu_s": 25.73, "teksti": "Ja tänään vouti kysyi, onko joku vienyt jotain veneellä yli salmen. Kukaan ei ole vienyt mitään – paitsi minun hermoni.", "ilme": "hymy"},
    ],
    kohteet: [{"kohta": 1, "nimi": "kavassi", "kohde": {"paikka": [-23.3, -6.85, 41.0], "sade": 4.7}}],
  },
  keittio: {
    kertoja: "Keittiö on pienellä linnanpihalla, ja valtavissa padoissa porisee ilta-ateria. Kokki komentaa, ja vesipoika kantaa sankoja sisään.",
    vuorot: [
      {"puhuja": "kokki", "alku_s": 0.0, "loppu_s": 9.79, "teksti": "Kalaa ja naurista, naurista ja kalaa! Jos vouti vielä kerran kysyy, mitä tänään syödään, sanon: samaa mitä järvi ja pelto antaa.", "ilme": "hymy"},
      {"puhuja": "vesipoika", "alku_s": 10.46, "loppu_s": 16.51, "teksti": "Kaksi sankoa lisää. Tuli on palanu aamusta asti – kohta tää keittiö kiehuu itekin.", "ilme": "neutraali"},
      {"puhuja": "kokki", "alku_s": 17.12, "loppu_s": 24.49, "teksti": "Vie tää vati Linnantupaan sotilaille. Yläsaliin mä vien itse – siellä ei kelpaa sankonkantajan likaiset sormet.", "ilme": "vakava"},
      {"puhuja": "vouti", "alku_s": 25.05, "loppu_s": 30.9, "teksti": "Kokki, en ehdi aterioimaan. Iltarukous alkaa, ja minun on vielä pistäydyttävä kappelissa.", "ilme": "huolestunut"},
    ],
    kohteet: [{"kohta": 0, "nimi": "liesi", "kohde": {"paikka": [14.0, 0.9, 4.9], "sade": 1.9}}, {"kohta": 1, "nimi": "padat", "kohde": {"paikka": [14.05, 1.08, 4.75], "sade": 1.2}}],
  },
  keskushalli: {
    kertoja: "Keskushallin alakerrassa on Linnantupa, sotaväen ruokasali. Linnassa asui jopa kaksisataa henkeä, ja iltaisin tuvassa on tungosta.",
    vuorot: [
      {"puhuja": "apulainen", "alku_s": 0.0, "loppu_s": 7.42, "teksti": "Tietä, tietä! Kalakeittoa Linnantupaan ja voudin pöytään ylös toiseen kerrokseen – kumpikaan ei odota.", "ilme": "vakava"},
      {"puhuja": "vartija2", "alku_s": 7.89, "loppu_s": 11.34, "teksti": "Kolme kuutosta! Maksa, kun vielä kehtaat.", "ilme": "hymy"},
      {"puhuja": "vartija", "alku_s": 11.74, "loppu_s": 17.38, "teksti": "Puhu hiljempaa. Vouti ravaa tänään portaissa kuin päätön kana – jotain on hukassa.", "ilme": "vakava"},
      {"puhuja": "talonpoika", "alku_s": 17.91, "loppu_s": 24.19, "teksti": "Ja me lämmitellään täällä alhaalla. Hormeja myöten paras lämpö nousee voudin kamariin.", "ilme": "hymy"},
    ],
    kohteet: [{"kohta": 1, "nimi": "takka ja hormi", "kohde": {"paikka": [-14.75, 2.25, -17.9], "sade": 3.0}}],
  },
  kappeli: {
    kertoja: "Kirkkotornin kolmannessa kerroksessa on linnan kappeli, ja kynttilät on jo sytytetty. Kappalainen valmistautuu iltarukoukseen, kun vouti astuu sisään ajatuksissaan.",
    vuorot: [
      {"puhuja": "kappalainen", "alku_s": 0.0, "loppu_s": 8.78, "teksti": "Dominus vobiscum… Herra vouti, iltarukous alkaa, ja te seisotte käytävällä kuin kadonnutta lammasta etsien.", "ilme": "vakava"},
      {"puhuja": "vouti", "alku_s": 9.4, "loppu_s": 16.08, "teksti": "Anteeksi, isä. En etsi mitään. Laskin vain vihkimäristit – kaksitoista, niin kuin aina.", "ilme": "huolestunut"},
      {"puhuja": "kappalainen", "alku_s": 16.65, "loppu_s": 24.61, "teksti": "Laskekaa mieluummin syntinne. Ja siirtykää: tuon pienen aukon takana sairaat odottavat näkevänsä alttarin.", "ilme": "vakava"},
      {"puhuja": "vouti", "alku_s": 25.17, "loppu_s": 28.99, "teksti": "Fatabuurin avain… missä minä sitä pitelinkään?", "ilme": "huolestunut"},
    ],
    kohteet: [{"kohta": 0, "nimi": "vihkimäristit", "kohde": {"paikka": [0.0, 10.75, -20.0], "sade": 5.4}}, {"kohta": 1, "nimi": "hagioskooppi", "kohde": {"paikka": [0.26, 10.3, -24.97], "sade": 0.45}}, {"kohta": 2, "nimi": "kattomaalaus", "kohde": {"paikka": [0.0, 12.8, -20.0], "sade": 4.0}}],
  },
  fatabuuri: {
    kertoja: "Kellotornin holvissa on fatabuuri, ruotsiksi vaate- ja tavara-aitta. Hoitaja laskee tavaroita kirjaansa, kun renki tulee holviin.",
    vuorot: [
      {"puhuja": "hoitaja", "alku_s": 0.0, "loppu_s": 7.64, "teksti": "Kolme viittaa, kaksi verkaröijyä, tusina tinakannuja. Kaikki kirjaan – muuten vouti kysyy.", "ilme": "neutraali"},
      {"puhuja": "renki", "alku_s": 8.22, "loppu_s": 12.36, "teksti": "Arkun kansi oli raollaan, kun tulin. Joku on käynyt täällä ilman lupaa.", "ilme": "huolestunut"},
      {"puhuja": "hoitaja", "alku_s": 12.83, "loppu_s": 21.56, "teksti": "Ilman lupaa? Kellotornin holviin ei tulla kuin avaimella. Tämä on linnan arvotavaran varasto, ei mikään ruokakellari.", "ilme": "vakava"},
    ],
    kohteet: [{"kohta": "fatabuuri-k4", "nimi": "sinettiarkku ja kankaat", "kohde": {"paikka": [-32.95, 0.38, -19.17], "sade": 1.2}}],
  },
  muurinharja: {
    kertoja: "Muurin harjalla kulkee avoin puolustuskäytävä. Vartija tähyilee itään, ja hänen vierellään seisoo talonpoika, joka on kerran puolustanut näitä muureja.",
    vuorot: [
      {"puhuja": "vartija", "alku_s": 0.0, "loppu_s": 6.05, "teksti": "Tuuli viiltää, ja silti täällä harjalla ei nukuta. Itäraja on lähempänä kuin luulisi.", "ilme": "vakava"},
      {"puhuja": "talonpoika", "alku_s": 6.93, "loppu_s": 17.66, "teksti": "Minä seisoin tällä samalla harjalla vuonna tuhatneljäsataayhdeksänkymmentäviisi, kun ne tulivat. Kiviä ja nuolia alas, ja piiritysportaat perään.", "ilme": "vakava"},
      {"puhuja": "vartija", "alku_s": 18.59, "loppu_s": 28.22, "teksti": "Silloin vouti Kylliäinen komensi kuin olisi syntynyt haarniska päällä. Nykyisestä voudista en tiedä – se etsii jotain kaikista kolmesta tornista.", "ilme": "neutraali"},
    ],
    kohteet: [{"kohta": 1, "nimi": "hakapyssyn ampuma-aukko", "kohde": {"paikka": [-11.71, 13.68, -20.35], "sade": 1.0}}],
  },
  kierreportaat: {
    kertoja: "Kapeat kierreportaat nousevat tornin kerroksesta toiseen. Kirjuri kiirehtii ylös kirjeineen, ja portaissa häntä vastaan tulee renki.",
    vuorot: [
      {"puhuja": "kirjuri", "alku_s": 0.0, "loppu_s": 9.48, "teksti": "Kolmas kerros, neljäs kerros… Ilman voudin sinettiä ei yksikään kirje lähde linnasta, ja minä juoksen näitä portaita edestakaisin.", "ilme": "huolestunut"},
      {"puhuja": "renki", "alku_s": 10.02, "loppu_s": 18.33, "teksti": "Varovasti, herra kirjuri, näissä portaissa ei ohiteta ketään. Kapeaa ja ahdasta – vihollisellekin, kiitos siitä.", "ilme": "hymy"},
      {"puhuja": "kirjuri", "alku_s": 18.94, "loppu_s": 27.06, "teksti": "Viisi kerrosta, ja ylin asuttu on kolmas. Neljännellä vain tuuli ja vartijat. Minä en ole kumpaakaan.", "ilme": "hymy"},
    ],
    kohteet: [{"kohta": 1, "nimi": "portaat (askelmat 26–31)", "kohde": {"paikka": [-27.24, 12.95, -16.44], "sade": 3.0}}],
  },
};

export function kohtauksetV3(tila) {
  const v3 = KOHTAUKSET_V3[tila?.id];
  if (!v3) return tila;
  const kohde = (kohta) => v3.kohteet.find((k) => k.kohta === kohta)?.kohde;
  const pulu = (tila.kuunnelma ?? []).filter((r) => r.puhuja === 'pulu')
    .map((r) => ({ aani: r.aani, teksti: r.teksti, puhuja: 'pulu', ...(kohde(r.id) ? { kohde: kohde(r.id) } : {}) }));
  const kohdat = [...(tila.taulu?.kohdat ?? []).map((k, i) => (kohde(i) ? { ...k, kohde: kohde(i) } : k)), ...pulu];
  return {
    ...tila,
    kasikirjoitus: [{ tee: 'pulu-lenna' }, { tee: 'taulu' }],
    kuunnelma: [
      { id: `${tila.id}-kertoja`, puhuja: 'kertoja', nimi: 'Kertoja', aani: `${tila.id}-kertoja`, teksti: v3.kertoja },
      { id: `${tila.id}-keskustelu`, puhuja: 'keskustelu', nimi: '', aani: `${tila.id}-keskustelu`,
        teksti: v3.vuorot.map((v) => v.teksti).join(' '), vuorot: v3.vuorot },
    ],
    hahmot: (tila.hahmot ?? []).map((h) => ({ ...h, repliikit: [] })),
    taulu: tila.taulu ? { ...tila.taulu, kohdat } : tila.taulu,
  };
}
