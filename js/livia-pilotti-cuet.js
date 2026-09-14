/* Generated from docs/raportit/horatio-livia-eurooppa-luentamanifesti-20260914-r2.json; no estimated milliseconds. */
export const LIVIAN_EUROOPAN_REVISION = "eu-hl-europe-20260914-r2-approved";
export const LIVIAN_PILOTIN_REVISION = LIVIAN_EUROOPAN_REVISION;
export const LIVIAN_E4_REVISION = LIVIAN_EUROOPAN_REVISION;

const pilotti = (kaupunki, revision, tekstiSha256, cuet) => Object.freeze({
  revision,
  kaupunki,
  avain: `${kaupunki}-3`,
  kentta: 'kommentti',
  kupla: 0,
  tekstiSha256,
  aaniNimi: `livia-${kaupunki}-3.mp3`,
  kohde: `assets/aikaleimat/livia-${kaupunki}-3.eleet.json`,
  r2Kohde: `aanet/pulu/livia-${kaupunki}-3.eleet.json`,
  cuet: Object.freeze(cuet.map((cue) => Object.freeze({ esiintyma: 1, ...cue }))),
});

export const LIVIAN_LUENTA_CUET = Object.freeze({
  ateena: pilotti("ateena", LIVIAN_EUROOPAN_REVISION, "c33e5126d8a0723dc73c4b431302409973fb982d8cabd4a0f6afdcc2c791a566", [
  {
    "id": "ateena.livia.c1",
    "ankkuri": "Schliemannin talo on nyt rahamuseo",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "ateena.livia.c2",
    "ankkuri": "löysin kiiltävän kolikon ja peitin sen jalallani",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  },
  {
    "id": "ateena.livia.c3",
    "ankkuri": "Sitten lapsi palasi etsimään",
    "esiintyma": 1,
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.45
  },
  {
    "id": "ateena.livia.c4",
    "ankkuri": "Siirsin jalkaa ihan vähän",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.4
  },
  {
    "id": "ateena.livia.c5",
    "ankkuri": "Hän ilahtui. Niin minäkin",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.55
  }
]),
  sofia: pilotti("sofia", LIVIAN_EUROOPAN_REVISION, "a2d6d6ffb6ccabd33da64e053acdce5b63479109e4b8de0433ad57671f067f14", [
  {
    "id": "sofia.livia.c1",
    "ankkuri": "Sofian lähteeltä haetaan yhä kuumaa vettä",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "sofia.livia.c2",
    "ankkuri": "höyry pörrötti otsasulkani",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.55
  },
  {
    "id": "sofia.livia.c3",
    "ankkuri": "Arvokkuus palasi vasta seuraavalla räystäällä",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.4
  }
]),
  istanbul: pilotti("istanbul", LIVIAN_EUROOPAN_REVISION, "c46ed911758a0312a122a2055e142db9fa4843cb6fcf05b1bdc754f4965dd7f0", [
  {
    "id": "istanbul.livia.c1",
    "ankkuri": "Tünel kulkee yhä mäen alla",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "istanbul.livia.c2",
    "ankkuri": "Minä kuljen yllä",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.55
  },
  {
    "id": "istanbul.livia.c3",
    "ankkuri": "Kisasin vaunun kanssa",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.5
  },
  {
    "id": "istanbul.livia.c4",
    "ankkuri": "matkustajat eivät hengästyneet",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.45
  },
  {
    "id": "istanbul.livia.c5",
    "ankkuri": "Myönnetään: kätevä laite",
    "esiintyma": 1,
    "tarkoitus": "myotailee",
    "voimakkuus": 0.5
  }
]),
  rooma: pilotti("rooma", LIVIAN_EUROOPAN_REVISION, "720c7925c99a9c9977292a86530a419f73ce372d816df17c78606cfafcdcc6c0", [
  {
    "id": "rooma.livia.c1",
    "ankkuri": "Pantheoniin ostetaan nyt pääsylippu",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "rooma.livia.c2",
    "ankkuri": "kiersin kattoaukkoa juuri, kun sade alkoi",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  },
  {
    "id": "rooma.livia.c3",
    "ankkuri": "Alhaalla ihmiset siirtyivät kuivaan",
    "esiintyma": 1,
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.35
  },
  {
    "id": "rooma.livia.c4",
    "ankkuri": "ensin oli pakko katsoa, mihin sade sisällä menee",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.5
  }
]),
  bukarest: pilotti("bukarest", LIVIAN_EUROOPAN_REVISION, "130666b9dd63aeb3413a7e1c190dbb14840b57a14d91c992e9ff1a3ade979d53", [
  {
    "id": "bukarest.livia.c1",
    "ankkuri": "Văcăreștin luonnonpuisto, hylätyn tekojärvihankkeen paikalla",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "bukarest.livia.c2",
    "ankkuri": "Lensin betonivallin yli ruovikon ylle",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  },
  {
    "id": "bukarest.livia.c3",
    "ankkuri": "ihmiset kantavat kiikareita nähdäkseen meidät paremmin",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.55
  },
  {
    "id": "bukarest.livia.c4",
    "ankkuri": "käänsin paremman kylkeni",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.5
  },
  {
    "id": "bukarest.livia.c5",
    "ankkuri": "Kiikaroikaa rauhassa",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.4
  }
]),
  sarajevo: pilotti("sarajevo", LIVIAN_EUROOPAN_REVISION, "145fb8120049fc081ddd36ebe98f44369868e89bac35068d2981a3e14ce6da9d", [
  {
    "id": "sarajevo.livia.c1",
    "ankkuri": "Kuparisepät naputtavat basaarissa yhä",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "sarajevo.livia.c2",
    "ankkuri": "jäin kuuntelemaan yhtä vasaraa",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.45
  },
  {
    "id": "sarajevo.livia.c3",
    "ankkuri": "Yritin naputtaa nokalla samaa tahtia",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.55
  },
  {
    "id": "sarajevo.livia.c4",
    "ankkuri": "seppä oli kyllä nopeampi",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.45
  }
]),
  madrid: pilotti("madrid", LIVIAN_EUROOPAN_REVISION, "8292b6b023add9c9b17b6c523c71ac99d679c396b073f9a2516a42c8e3384548", [
  {
    "id": "madrid.livia.c1",
    "ankkuri": "Retiron lammella vuokrataan nyt soutuveneitä",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "madrid.livia.c2",
    "ankkuri": "Laskeuduin yhden keulaan kokeilemaan matkustajan osaa",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  },
  {
    "id": "madrid.livia.c3",
    "ankkuri": "Soutaja sai veneen pyörimään ympyrää",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.5
  },
  {
    "id": "madrid.livia.c4",
    "ankkuri": "Olisin voinut lentää, tietenkin",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.35
  },
  {
    "id": "madrid.livia.c5",
    "ankkuri": "minä jäin vielä yhdelle kierrokselle",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.5
  }
]),
  wien: pilotti("wien", LIVIAN_EUROOPAN_REVISION, "99deb3d702990d1fec29d2e2b4c02cac6b8bdde0f03435dfcd26bc9fa077c03b", [
  {
    "id": "wien.livia.c1",
    "ankkuri": "Wieniin johdetaan nyt juomavettä vuoristolähteistä",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "wien.livia.c2",
    "ankkuri": "odotin pisaraa nokka auki",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  },
  {
    "id": "wien.livia.c3",
    "ankkuri": "Kokonainen matka vuorilta asti",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.45
  },
  {
    "id": "wien.livia.c4",
    "ankkuri": "minä vain ojensin kaulaani",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.4
  }
]),
  pariisi: pilotti("pariisi", LIVIAN_EUROOPAN_REVISION, "3b524abb834d06e629bef36e5d672a0c118e71cbee05b7ae24099d0df7171230", [
  {
    "id": "pariisi.livia.c1",
    "ankkuri": "Palatsia ei enää ole",
    "esiintyma": 1,
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.35
  },
  {
    "id": "pariisi.livia.c2",
    "ankkuri": "vihreän tuolin juuri siihen, missä haluaa istua",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "pariisi.livia.c3",
    "ankkuri": "Valitsin selkänojan auringosta",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.4
  },
  {
    "id": "pariisi.livia.c4",
    "ankkuri": "minä sain uuden näkymän liikahtamatta",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.4
  },
  {
    "id": "pariisi.livia.c5",
    "ankkuri": "He olivat tavanneet täällä jo koululaisina",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.55
  }
]),
  berliini: pilotti("berliini", LIVIAN_EUROOPAN_REVISION, "0672699880869cba078b643ba78abda55fe3e3c34d95022b283a650ef264418f", [
  {
    "id": "berliini.livia.c1",
    "ankkuri": "lensin punaisen leijan rinnalla",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  },
  {
    "id": "berliini.livia.c2",
    "ankkuri": "räpäyttämättä siipeäkään",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.45
  },
  {
    "id": "berliini.livia.c3",
    "ankkuri": "Hiukan ärsyttävää",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.5
  },
  {
    "id": "berliini.livia.c4",
    "ankkuri": "narun toisessa päässä mies juoksi hiki hatussa",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "berliini.livia.c5",
    "ankkuri": "Helpotukseni oli suuri",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.5
  },
  {
    "id": "berliini.livia.c6",
    "ankkuri": "Joku tässä sentään teki töitä",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.55
  }
]),
  lontoo: pilotti("lontoo", LIVIAN_EUROOPAN_REVISION, "2a22c0329b0ccafe38385c0b8a11856666e4acbd7ea928775656a3f7786c5331", [
  {
    "id": "lontoo.livia.c1",
    "ankkuri": "Nyt metron junat kulkevat sähköllä",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "lontoo.livia.c2",
    "ankkuri": "näen, kuka tulee perässä",
    "esiintyma": 1,
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.4
  },
  {
    "id": "lontoo.livia.c3",
    "ankkuri": "tarkistin saman varjon kolmesti",
    "esiintyma": 1,
    "tarkoitus": "epailee",
    "voimakkuus": 0.45
  },
  {
    "id": "lontoo.livia.c4",
    "ankkuri": "Omahan se oli",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.45
  }
]),
  budapest: pilotti("budapest", LIVIAN_EUROOPAN_REVISION, "d6cc78fd2a1fd884d28cf2aa3fe75bd5199d6faf07567b68506e636c4316d0cc", [
  {
    "id": "budapest.livia.c1",
    "ankkuri": "Ketjusillan leijonilla ei kuulemma ole kieliä",
    "esiintyma": 1,
    "tarkoitus": "epailee",
    "voimakkuus": 0.45
  },
  {
    "id": "budapest.livia.c2",
    "ankkuri": "onhan siellä",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.55
  },
  {
    "id": "budapest.livia.c3",
    "ankkuri": "Alhaalta niitä ei vain näe",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "budapest.livia.c4",
    "ankkuri": "opas kertoi uuden ryhmänsä edessä saman vanhan jutun",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.5
  },
  {
    "id": "budapest.livia.c5",
    "ankkuri": "Minulla olisi tästä aivan tuore havainto",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.6
  }
]),
  dubrovnik: pilotti("dubrovnik", LIVIAN_EUROOPAN_REVISION, "32a90229e5393d73156d85eeca82f974991ed033232392fc7bc4a42d180cc383", [
  {
    "id": "dubrovnik.livia.c1",
    "ankkuri": "Lazaretin pihalla katselin linđo-tanssia",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "dubrovnik.livia.c2",
    "ankkuri": "parit vaihtoivat suuntaa kuin yhteisestä ajatuksesta",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.45
  },
  {
    "id": "dubrovnik.livia.c3",
    "ankkuri": "askel, käännös, toinen askel",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.5
  },
  {
    "id": "dubrovnik.livia.c4",
    "ankkuri": "Siivet piti avata heti",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.45
  },
  {
    "id": "dubrovnik.livia.c5",
    "ankkuri": "Ihmiset tekivät kaiken ilman niitä",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.55
  }
]),
  praha: pilotti("praha", LIVIAN_EUROOPAN_REVISION, "ddeeef8a4b8ae574d2872df4f3fbd9c5127a10de0290e90a46d982eaac36bf62", [
  {
    "id": "praha.livia.c1",
    "ankkuri": "Kello kokoaa torille väkeä yhä",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "praha.livia.c2",
    "ankkuri": "puhelintaan katsovat ihmiset nostivat yhtä aikaa päänsä",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.45
  },
  {
    "id": "praha.livia.c3",
    "ankkuri": "Kun luuranko liikahti",
    "esiintyma": 1,
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.35
  },
  {
    "id": "praha.livia.c4",
    "ankkuri": "nostin minäkin",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.35
  }
]),
  tukholma: pilotti("tukholma", LIVIAN_EUROOPAN_REVISION, "5a2b34fec2b51b9916e9dc1d81dacad3b3d892d61f91535aa5f00186987ede22", [
  {
    "id": "tukholma.livia.c1",
    "ankkuri": "kalastajan vapa taipui niin, että unohdin koko linnan",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.45
  },
  {
    "id": "tukholma.livia.c2",
    "ankkuri": "Kävelin pitkin kaidetta kalan mukana",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  },
  {
    "id": "tukholma.livia.c3",
    "ankkuri": "roiskautti vettä rinnuksilleni ja katosi",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.55
  },
  {
    "id": "tukholma.livia.c4",
    "ankkuri": "Kalastaja jäi tuijottamaan tyhjää siimaa",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.4
  },
  {
    "id": "tukholma.livia.c5",
    "ankkuri": "Meillä oli nyt yhteinen puheenaihe",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.5
  }
]),
  kobenhavn: pilotti("kobenhavn", LIVIAN_EUROOPAN_REVISION, "02bd604bbf98070922f388083278dbca5b2e52f33c62437e31ec9f69f9214efd", [
  {
    "id": "kobenhavn.livia.c1",
    "ankkuri": "esirippu on valtava riikinkukon pyrstö",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "kobenhavn.livia.c2",
    "ankkuri": "Se laskeutui, ja näyttämö aukesi",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.6
  },
  {
    "id": "kobenhavn.livia.c3",
    "ankkuri": "kurkistin sivulta, minne pyrstö oikein meni",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.45
  },
  {
    "id": "kobenhavn.livia.c4",
    "ankkuri": "Halusin nähdä koneiston",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.4
  },
  {
    "id": "kobenhavn.livia.c5",
    "ankkuri": "yleisö nauroi jo",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.5
  }
]),
  helsinki: pilotti("helsinki", LIVIAN_EUROOPAN_REVISION, "d68ad288732dd8d07d18f6c5af42193b514d27119c021c72a99e69f232d127fd", [
  {
    "id": "helsinki.livia.c1",
    "ankkuri": "tuomiokirkon apostolien näköalaa",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "helsinki.livia.c2",
    "ankkuri": "torin kalat näkyivät paremmin alempaa",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.45
  },
  {
    "id": "helsinki.livia.c3",
    "ankkuri": "Lokki ehti ensin",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.5
  },
  {
    "id": "helsinki.livia.c4",
    "ankkuri": "kuin olisin ollut harjoittelija",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  }
]),
  tallinna: pilotti("tallinna", LIVIAN_EUROOPAN_REVISION, "ac627c3f69360a941f6f97e5e31339da90560c1da3906a5ab8ee97605b9023bf", [
  {
    "id": "tallinna.livia.c1",
    "ankkuri": "Raeapteekki myy marsipaania yhä",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "tallinna.livia.c2",
    "ankkuri": "odotin portaalla, että joku murentaisi annoksensa",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.4
  },
  {
    "id": "tallinna.livia.c3",
    "ankkuri": "Yksi lapsi jakoi palan ystävälleen",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.5
  },
  {
    "id": "tallinna.livia.c4",
    "ankkuri": "isoisän lääkkeessä oli oikea ajatus",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.45
  }
]),
  sevilla: pilotti("sevilla", LIVIAN_EUROOPAN_REVISION, "0fd228327bdfa562bce8aa7c51199dadcd17f0502e34abd7c39a6615bbb97fee", [
  {
    "id": "sevilla.livia.c1",
    "ankkuri": "Entinen tupakkatehdas on nyt yliopisto",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "sevilla.livia.c2",
    "ankkuri": "niin suuren paperipinon, että lähdin vaistosta perään",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.5
  },
  {
    "id": "sevilla.livia.c3",
    "ankkuri": "Ne eivät olleet kirjeitä",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.45
  },
  {
    "id": "sevilla.livia.c4",
    "ankkuri": "Hyvä yritys",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.35
  }
]),
  bergen: pilotti("bergen", LIVIAN_EUROOPAN_REVISION, "7201aaa2bd48165faf357260db7ed3902e9f6385ca7535b8d70b4083856c43f1", [
  {
    "id": "bergen.livia.c1",
    "ankkuri": "lapsilla ja nuorilla on omat rumpujoukot",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "bergen.livia.c2",
    "ankkuri": "Johtajansakin he valitsevat itse",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.55
  },
  {
    "id": "bergen.livia.c3",
    "ankkuri": "Liityin marssimaan perään rinta pystyssä",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.55
  },
  {
    "id": "bergen.livia.c4",
    "ankkuri": "meitä. Meitä!",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.6
  },
  {
    "id": "bergen.livia.c5",
    "ankkuri": "Pidin siivet visusti kyljissä",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.45
  },
  {
    "id": "bergen.livia.c6",
    "ankkuri": "En aikonut pilata muodostelmaa",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.4
  }
]),
  amsterdam: pilotti("amsterdam", LIVIAN_EUROOPAN_REVISION, "a22b040783d01e72dc7e15b6827bcd4d099cda9389c72108cd3377c8ed8e0378", [
  {
    "id": "amsterdam.livia.c1",
    "ankkuri": "pyörähalli veden alla",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "amsterdam.livia.c2",
    "ankkuri": "Seitsemälletuhannelle pyörälle",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.6
  },
  {
    "id": "amsterdam.livia.c3",
    "ankkuri": "Kävin kurkistamassa sisään ja palasin rantaan",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  },
  {
    "id": "amsterdam.livia.c4",
    "ankkuri": "Sen alla minä olin juuri kävellyt, kuivin jaloin",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.5
  },
  {
    "id": "amsterdam.livia.c5",
    "ankkuri": "nähdä sen ilmeen, jos se olisi tiennyt",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  }
]),
  dublin: pilotti("dublin", LIVIAN_EUROOPAN_REVISION, "35b090c4334a2ed02ef719637ad22bde613a9dbb87251d680b163db36f74dc06", [
  {
    "id": "dublin.livia.c1",
    "ankkuri": "panimolle jonotetaan nyt kameroiden kanssa",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "dublin.livia.c2",
    "ankkuri": "Asetuin matkalaukun viereen kuvaan",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.5
  },
  {
    "id": "dublin.livia.c3",
    "ankkuri": "Kuvaaja tähtäsi harppumerkkiin",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.45
  },
  {
    "id": "dublin.livia.c4",
    "ankkuri": "Otin askeleen lähemmäs",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.4
  },
  {
    "id": "dublin.livia.c5",
    "ankkuri": "Ihan vain sommittelun vuoksi",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  }
]),
  edinburgh: pilotti("edinburgh", LIVIAN_EUROOPAN_REVISION, "00f398aa358ab3a3b9cdff7e56a98ce805af258e9534d27e095717abbacb9cbd", [
  {
    "id": "edinburgh.livia.c1",
    "ankkuri": "tutkivat vainajia oppiakseen ihmisen rakennetta",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.35
  },
  {
    "id": "edinburgh.livia.c2",
    "ankkuri": "Ruumiita saatiin laillisesti liian vähän",
    "esiintyma": 1,
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.5
  },
  {
    "id": "edinburgh.livia.c3",
    "ankkuri": "varkaille maksettiin",
    "esiintyma": 1,
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.55
  },
  {
    "id": "edinburgh.livia.c4",
    "ankkuri": "hautausmaalla sai olla rauhassa",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.5
  }
]),
  lissabon: pilotti("lissabon", LIVIAN_EUROOPAN_REVISION, "9782fc69503a840b0330a49eb4625376b2d9f957d238693316b8ca2b06949951", [
  {
    "id": "lissabon.livia.c1",
    "ankkuri": "talot seisovat kylki kyljessä",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.35
  },
  {
    "id": "lissabon.livia.c2",
    "ankkuri": "värikkäät kaakelit",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  },
  {
    "id": "lissabon.livia.c3",
    "ankkuri": "Lennän punaisten tiilikattojen yli",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  },
  {
    "id": "lissabon.livia.c4",
    "ankkuri": "kujat mutkittelevat varjossa",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.35
  },
  {
    "id": "lissabon.livia.c5",
    "ankkuri": "kimaltaa leveä Tejojoki",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.45
  }
]),
  riika: pilotti("riika", LIVIAN_EUROOPAN_REVISION, "3561bb8d37ed7db9b0b7ac524247c670177ad00b8a1298d1ed604872aefd93e0", [
  {
    "id": "riika.livia.c1",
    "ankkuri": "majaville tuodaan oksia, jotta puistopuut säästyisivät",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "riika.livia.c2",
    "ankkuri": "Katselin yhden illallista",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.35
  },
  {
    "id": "riika.livia.c3",
    "ankkuri": "ollut aivan liian helppo naapuri",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.45
  }
]),
  barcelona: pilotti("barcelona", LIVIAN_EUROOPAN_REVISION, "86bcd4a76baf446479e921e67825efb01865c0ce975ce8b701d73673d66a4f31", [
  {
    "id": "barcelona.livia.c1",
    "ankkuri": "Sagrada Famíliassa pesii muuttohaukkoja",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "barcelona.livia.c2",
    "ankkuri": "katsella pesäkamerasta",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.35
  },
  {
    "id": "barcelona.livia.c3",
    "ankkuri": "emon palaavan kyyhky kynsissään",
    "esiintyma": 1,
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.55
  },
  {
    "id": "barcelona.livia.c4",
    "ankkuri": "Suosittelen kameraa",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.4
  }
]),
  firenze: pilotti("firenze", LIVIAN_EUROOPAN_REVISION, "b97b96dadf2d9e86a559720544c1de512d26e216d89d7b2ab3dc9c81de5759a5", [
  {
    "id": "firenze.livia.c1",
    "ankkuri": "ilotulituksen sytyttää kyyhkynmuotoinen raketti",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "firenze.livia.c2",
    "ankkuri": "kiitää kirkosta vaijeria pitkin",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.6
  },
  {
    "id": "firenze.livia.c3",
    "ankkuri": "Minä jännitin paluuta",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.45
  },
  {
    "id": "firenze.livia.c4",
    "ankkuri": "omia kannustetaan",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.5
  }
]),
  venetsia: pilotti("venetsia", LIVIAN_EUROOPAN_REVISION, "2cbd024d573c4a3aee0900a057d2260ad0056570cbae2f1239cbf44410cf0601", [
  {
    "id": "venetsia.livia.c1",
    "ankkuri": "Venetsiassa kuljetaan yhä vesibusseilla",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "venetsia.livia.c2",
    "ankkuri": "lennän nykyään vähän pidempää reittiä",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.4
  },
  {
    "id": "venetsia.livia.c3",
    "ankkuri": "Yhden tutun takia",
    "esiintyma": 1,
    "tarkoitus": "rakkaus",
    "voimakkuus": 0.65
  },
  {
    "id": "venetsia.livia.c4",
    "ankkuri": "nuo kuvat ovat yksityisiä",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.6
  },
  {
    "id": "venetsia.livia.c5",
    "ankkuri": "jokaiseen hyvään kuvakulmaan",
    "esiintyma": 1,
    "tarkoitus": "rakkaus",
    "voimakkuus": 0.65
  },
  {
    "id": "venetsia.livia.c6",
    "ankkuri": "ehkä minä vähän odotin",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.45
  }
]),
  marseille: pilotti("marseille", LIVIAN_EUROOPAN_REVISION, "3ad8556ac1e68f70bec57537b64b79afeb8c649660ce65fbb41e11677affd5a3", [
  {
    "id": "marseille.livia.c1",
    "ankkuri": "Vieux-Portin tunnistan äänestä ja suolasta höyhenissä",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "marseille.livia.c2",
    "ankkuri": "Seurasin lokkien kierrosta sataman pöydillä",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.4
  },
  {
    "id": "marseille.livia.c3",
    "ankkuri": "Yksi nyökkäsi minulle",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.45
  },
  {
    "id": "marseille.livia.c4",
    "ankkuri": "Työlupa myönnetty, ajattelin",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.5
  },
  {
    "id": "marseille.livia.c5",
    "ankkuri": "pidin silti vähän etäisyyttä sen nokkaan",
    "esiintyma": 1,
    "tarkoitus": "epailee",
    "voimakkuus": 0.45
  }
]),
  oslo: pilotti("oslo", LIVIAN_EUROOPAN_REVISION, "07da5beed55c35f042c6ed836e2e970cd221ad1b3d8a194fd72cc87971febf40", [
  {
    "id": "oslo.livia.c1",
    "ankkuri": "valkoinen katto nousee vuonon rannasta kuin mäki",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "oslo.livia.c2",
    "ankkuri": "Ihmiset kävelevät sen päällä",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.4
  },
  {
    "id": "oslo.livia.c3",
    "ankkuri": "Minä väistin yhtä kenkää",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.5
  },
  {
    "id": "oslo.livia.c4",
    "ankkuri": "tavallisesti meidän aluettamme",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.55
  }
]),
  tampere: pilotti("tampere", LIVIAN_EUROOPAN_REVISION, "683df4b873f6770c4a87ccd9fe6eaf51ab7befd7a02194873f8ac6e3f2c50367", [
  {
    "id": "tampere.livia.c1",
    "ankkuri": "ihmiset jäähdyttelevät pihalla ja juttelevat ventovieraille",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "tampere.livia.c2",
    "ankkuri": "jäin aidalle kuuntelemaan",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.4
  },
  {
    "id": "tampere.livia.c3",
    "ankkuri": "Yksi teki lähtöä kolmesti",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  },
  {
    "id": "tampere.livia.c4",
    "ankkuri": "tiesin lopulta hänen putkiremonttinsa hinnan",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.5
  }
]),
  vilna: pilotti("vilna", LIVIAN_EUROOPAN_REVISION, "9bc924a83e9c9aa9f7ce84c5fc1d60aa5ac79771e3a19adb236ea80015c52b7e", [
  {
    "id": "vilna.livia.c1",
    "ankkuri": "julistivat kaupunginosansa leikillään tasavallaksi",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "vilna.livia.c2",
    "ankkuri": "vapauttaa kissan rakastamasta omistajaansa",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.5
  },
  {
    "id": "vilna.livia.c3",
    "ankkuri": "etsin lintujen pykälää",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.45
  },
  {
    "id": "vilna.livia.c4",
    "ankkuri": "Se puuttuu",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.45
  },
  {
    "id": "vilna.livia.c5",
    "ankkuri": "Minulla olisi lisättävää",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.55
  }
]),
  granada: pilotti("granada", LIVIAN_EUROOPAN_REVISION, "f3eb2032bfd6b943b42380d5a688f79bd839b9e5676b4874fd8f9b11986b80f9", [
  {
    "id": "granada.livia.c1",
    "ankkuri": "vesi ei kiivennyt sinne",
    "esiintyma": 1,
    "tarkoitus": "epailee",
    "voimakkuus": 0.4
  },
  {
    "id": "granada.livia.c2",
    "ankkuri": "yli kuuden kilometrin kanavaa pitkin",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "granada.livia.c3",
    "ankkuri": "Koko matka alamäkeä",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.6
  },
  {
    "id": "granada.livia.c4",
    "ankkuri": "kelvannut lepuuttaa siipiä",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  }
]),
  kiova: pilotti("kiova", LIVIAN_EUROOPAN_REVISION, "eb7113d19dad7c97283de63e76305bc2435d92661d88c8fb59e8382b4f01b15d", [
  {
    "id": "kiova.livia.c1",
    "ankkuri": "Kiovan tunnuspuu on hevoskastanja",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "kiova.livia.c2",
    "ankkuri": "uusia puita raketti-iskun tuhoamien tilalla",
    "esiintyma": 1,
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.55
  },
  {
    "id": "kiova.livia.c3",
    "ankkuri": "vein yhden oksanhaaraan risun",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.45
  },
  {
    "id": "kiova.livia.c4",
    "ankkuri": "Siihen saisi vielä pesän",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.45
  }
]),
  krakova: pilotti("krakova", LIVIAN_EUROOPAN_REVISION, "9b2e251741e6b126e01a208f4768fe11196a34921ec8274db3e7b247eaf4223b", [
  {
    "id": "krakova.livia.c1",
    "ankkuri": "eurooppalaisten tiedot Amerikasta olivat vielä hataria",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "krakova.livia.c2",
    "ankkuri": "Krakova on vanha yliopistokaupunki",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.35
  },
  {
    "id": "krakova.livia.c3",
    "ankkuri": "kuuntelin kahvilan ikkunalla opiskelijoiden väittelyä",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.4
  },
  {
    "id": "krakova.livia.c4",
    "ankkuri": "Kolme ihmistä, neljä mielipidettä",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.5
  }
]),
  moskova: pilotti("moskova", LIVIAN_EUROOPAN_REVISION, "b2895f9682e66e68545c2d5711ba96cbdcd8519da16b7f4ff955cbf6bd184921", [
  {
    "id": "moskova.livia.c1",
    "ankkuri": "pronssikoiran kuono on hierottu kiiltäväksi",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "moskova.livia.c2",
    "ankkuri": "hipaisin sitä nokallani",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.4
  },
  {
    "id": "moskova.livia.c3",
    "ankkuri": "edessä oli pitkä lento",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.4
  }
]),
  odessa: pilotti("odessa", LIVIAN_EUROOPAN_REVISION, "3566a97eceb729b0c15949ddbb4559c71c79250aa44d4d1565f93f6a49630ba7", [
  {
    "id": "odessa.livia.c1",
    "ankkuri": "kaupankäyntiin kuuluu sanailu",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "odessa.livia.c2",
    "ankkuri": "tuijotin kirsikoita",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.35
  },
  {
    "id": "odessa.livia.c3",
    "ankkuri": "ostanko vai vartioinko",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.45
  },
  {
    "id": "odessa.livia.c4",
    "ankkuri": "Pörhistin höyheniäni",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  },
  {
    "id": "odessa.livia.c5",
    "ankkuri": "Vartioin, tietenkin",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  }
]),
  pietari: pilotti("pietari", LIVIAN_EUROOPAN_REVISION, "1878a0603c8ef59d490d6f852cf6ede523a59aae5c8057b38083d21d2deeb65b", [
  {
    "id": "pietari.livia.c1",
    "ankkuri": "kissojen tehtävä on pitää hiiret loitolla taideaarteista",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "pietari.livia.c2",
    "ankkuri": "tervehdin yhtä pihalla",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.4
  },
  {
    "id": "pietari.livia.c3",
    "ankkuri": "Katolta, tietenkin",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.45
  }
]),
  varsova: pilotti("varsova", LIVIAN_EUROOPAN_REVISION, "6107f701ffea15bd593cd6f1ad33568d5e68e7e6da274c85edde186191484de5", [
  {
    "id": "varsova.livia.c1",
    "ankkuri": "saksalaiset hävittivät Varsovaa talo talolta",
    "esiintyma": 1,
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.6
  },
  {
    "id": "varsova.livia.c2",
    "ankkuri": "Raunioista koottiin tämä kukkula",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "varsova.livia.c3",
    "ankkuri": "puissa pesii lintuja",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.45
  },
  {
    "id": "varsova.livia.c4",
    "ankkuri": "tuolla huhuilee sepelkyyhky",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.5
  }
]),
  kreeta: pilotti("kreeta", LIVIAN_EUROOPAN_REVISION, "f0b494c79ae96104d506d79da1e8564efa0de7da9a57ca377c0db7fbae6a10bd", [
  {
    "id": "kreeta.livia.c1",
    "ankkuri": "sekä kellotorni että minareetti",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.45
  },
  {
    "id": "kreeta.livia.c2",
    "ankkuri": "rakennus on ollut välillä moskeija",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "kreeta.livia.c3",
    "ankkuri": "Aukion kahviloista kantautuu puheensorinaa",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.35
  },
  {
    "id": "kreeta.livia.c4",
    "ankkuri": "plataanin varjossa voisi viipyä pitkään",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.4
  }
]),
  sisilia: pilotti("sisilia", LIVIAN_EUROOPAN_REVISION, "2bfff1096f085d03e6ae87b5f0703678aae3be4d41a8e5c3669b47713b0d5479", [
  {
    "id": "sisilia.livia.c1",
    "ankkuri": "granitaa, makeaa jäähileherkkua",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.4
  },
  {
    "id": "sisilia.livia.c2",
    "ankkuri": "lämmin pulla, jonka päällä oli pienempi pulla",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.5
  },
  {
    "id": "sisilia.livia.c3",
    "ankkuri": "Minä nyökkäilin ikkunalaudalla",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.4
  },
  {
    "id": "sisilia.livia.c4",
    "ankkuri": "Pullallakin oli oma pulla",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.5
  }
]),
  islanti: pilotti("islanti", LIVIAN_EUROOPAN_REVISION, "0df930799ae67eca486f83672fae763239135d4cff4e35c10f8154d0019a07f3", [
  {
    "id": "islanti.livia.c1",
    "ankkuri": "puutalot on verhottu värikkäällä pellillä",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "islanti.livia.c2",
    "ankkuri": "varastoissa on nyt kahviloita",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.35
  },
  {
    "id": "islanti.livia.c3",
    "ankkuri": "löysin suojaisan terassin",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.4
  },
  {
    "id": "islanti.livia.c4",
    "ankkuri": "Tuuli löysi minut",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.5
  }
]),
  alpit: pilotti("alpit", LIVIAN_EUROOPAN_REVISION, "1fbaaabf5ee919e8db1bea1992d1697aa486331d61b1563ee431b3d4d348abd9", [
  {
    "id": "alpit.livia.c1",
    "ankkuri": "lehmät palaavat syksyllä vuoristolaitumilta kukkaseppeleissä",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "alpit.livia.c2",
    "ankkuri": "lensin juhlakulkueen mukana",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.5
  },
  {
    "id": "alpit.livia.c3",
    "ankkuri": "Yksi lehmä söi edellä kulkevan seppelettä",
    "esiintyma": 1,
    "tarkoitus": "hammentynyt",
    "voimakkuus": 0.55
  }
]),
  lappi: pilotti("lappi", LIVIAN_EUROOPAN_REVISION, "17ccbec208941df4986e8557f8968e1e48c0d09ff53c5e5b6256a574c9f9a083", [
  {
    "id": "lappi.livia.c1",
    "ankkuri": "keskustaan on piilotettu poron pää",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.55
  },
  {
    "id": "lappi.livia.c2",
    "ankkuri": "tiet haarautuvat sarviksi ja urheilukenttä on silmä",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.5
  },
  {
    "id": "lappi.livia.c3",
    "ankkuri": "Maasta sitä on vaikea huomata",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.4
  },
  {
    "id": "lappi.livia.c4",
    "ankkuri": "kannattaa olla lintu",
    "esiintyma": 1,
    "tarkoitus": "ilo",
    "voimakkuus": 0.55
  }
]),
  tromssa: pilotti("tromssa", LIVIAN_EUROOPAN_REVISION, "ef76b8cc076a36e7e436a320cd6ac41effa6a8aad0dcd4369c0bb81e3640b59d", [
  {
    "id": "tromssa.livia.c1",
    "ankkuri": "hotelliin lennetään suoraan huoneeseen",
    "esiintyma": 1,
    "tarkoitus": "hammastys",
    "voimakkuus": 0.4
  },
  {
    "id": "tromssa.livia.c2",
    "ankkuri": "pikkukajaville on rakennettu pesähyllyjä",
    "esiintyma": 1,
    "tarkoitus": "selittaa",
    "voimakkuus": 0.45
  },
  {
    "id": "tromssa.livia.c3",
    "ankkuri": "muualla kuin talojen ikkunalaudoilla",
    "esiintyma": 1,
    "tarkoitus": "miettiva",
    "voimakkuus": 0.4
  },
  {
    "id": "tromssa.livia.c4",
    "ankkuri": "Kirjekyyhkyllekin kelpaisi merinäköala",
    "esiintyma": 1,
    "tarkoitus": "lammin",
    "voimakkuus": 0.45
  }
]),
});

export const LIVIAN_LUENTAKAUPUNGIT = Object.freeze(Object.keys(LIVIAN_LUENTA_CUET));
export const LIVIAN_PILOTTIKAUPUNGIT = Object.freeze(['marseille', 'ateena', 'sarajevo', 'venetsia']);
export const LIVIAN_PILOTTI_CUET = Object.freeze(Object.fromEntries(
  LIVIAN_PILOTTIKAUPUNGIT.map((kaupunki) => [kaupunki, LIVIAN_LUENTA_CUET[kaupunki]]),
));

export function livianLuentatyo(kaupunki, kentta = 'kommentti', kupla = 0) {
  const tyo = LIVIAN_LUENTA_CUET[String(kaupunki ?? '')];
  return tyo && tyo.kentta === kentta && tyo.kupla === kupla ? tyo : null;
}

/** Vain pilotin yhden kommenttikuplan (`city-3`) tekninen työ. */
export function livianPilottityo(kaupunki, kentta = 'kommentti', kupla = 0) {
  return LIVIAN_PILOTTIKAUPUNGIT.includes(String(kaupunki ?? ''))
    ? livianLuentatyo(kaupunki, kentta, kupla) : null;
}
