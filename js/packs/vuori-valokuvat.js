// Vuorikohteiden kuvakarusellit: käsin kuratoidut valokuvat kartan
// maastonimien "Lue lisää" -ikkunaan.
//
// Omistajan tilaus 10.8.2026 (kuvakaappaus Kaukasus-popupista):
// "Vuorilta on varmasti hienoja kuvia. Niitä voisi lisätä jopa
// kymmenen. Tällaisiin kohteisiin, samanlaisiin karuselliin, voi käydä
// kaikki vuorikohteet läpi samalla tavalla ja lisätä laadukkaita
// kuvia."
//
// --- miksi käsin ja miksi tässä ---
//
// Maastonimen i-nappi avaa saman ikkunan kuin kaupungit, ja se osaa
// näyttää artikkelin kuvat karusellina ilmaiseksi. Wikipedian
// artikkelin kuvasto ei kuitenkaan kelpaa vuorille: Karpaattien
// artikkelissa on kaksi karttaa ja geologinen leikkaus, Uralilla
// rajapyykki. Kartan tummin läiskä ansaitsee parempaa, joten kuvat on
// valittu käsin.
//
// Avain on maastonimen `avain` (js/packs/maasto-nimet-vuoret.js), EI
// Wikipedia-otsikko. Otsikot törmäävät: Madagaskarin ylängön artikkeli
// on "Madagaskar", ja sama otsikko on Afrikan laudan saarikohteella —
// otsikkoavain olisi antanut kaupungille vuoristogallerian.
//
// --- mistä kuvat ovat ja mitä niistä on tarkistettu ---
//
// Kaikki Wikimedia Commonsista, vain PD- ja CC-lisenssit ilman ND- ja
// NC-ehtoa. Ehdokkaat on koottu Commonsin KATEGORIASTA, joka on sidottu
// vuoristoon Wikidatan kautta (tools/hae-vuorikuvat.mjs) — ei
// nimihaulla, koska hakutuloksen otsikko ei kerro, mikä vuori kuvassa
// on.
//
// JOKAINEN KUVA ON KATSOTTU SILMÄLLÄ ennen hyväksyntää
// (tools/tee-kuvataulu.py latoo ehdokkaat 480 pikselin ruuduiksi).
// Automaattinen seula ei näe väärää vuorta, vesileimaa eikä pehmeää
// tarkennusta; niistä kaikista on tässä työssä hylätty ehdokkaita.
//
// --- kentät ---
//
// tiedosto  Commonsin tiedostonimi ilman "File:"-etuliitettä. Yhdellä
//           rivillä (julkaisusääntö), vaikka nimi olisi pitkä.
// selite    suomenkielinen kuvateksti: mitä kuvassa näkyy ja mistä.
//           Kirjoitettu Commonsin kuvauksen POHJALTA, ei käännetty
//           sellaisenaan.
// lahde     tekijä ja lisenssi pelin vakiomuodossa
//           "Tekijä, Wikimedia Commons (CC BY-SA 4.0)". Tekijä on
//           Commonsin Artist-kentästä, ei muistista — väärä
//           tekijämerkintä on lisenssirikkomus siinä missä puuttuvakin.
//
// Enintään kymmenen kuvaa kohteessa (omistajan katto). Vähempi on
// parempi kuin heikko täytekuva: kuudesta upeasta jää parempi
// muistijälki kuin kymmenestä keskinkertaisesta.

export const VUORIKUVAT = {
  himalaja: [
    {
      tiedosto: 'Sunset view of Everest.jpg',
      selite: 'Auringonlasku Mount Everestillä. Viimeinen valo osuu vain '
        + 'ylimpiin huippuihin, kun laaksot ovat jo pimeässä — Everestin '
        + 'huipun poikki kulkee Nepalin ja Kiinan raja.',
      lahde: 'Nir B. Gurung, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Aerial View of Peaks of Khumbu, Ngozumpa Glacier and Gokyo Lakes (crop).jpg',
      selite: 'Khumbun huiput ilmasta: Ngozumpa-jäätikkö kivimoreenin alla ja '
        + 'Gokyon järvet sen vieressä. Taustan jonossa ovat Everest ja Makalu, '
        + 'ja koko näkymä on Sagarmathan kansallispuistoa.',
      lahde: 'Megaurab09 / UnpetitproleX, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Annapurna Massif-IMG 5221-Pano.jpg',
      selite: 'Annapurnan vuoristo perusleiristä nähtynä: edessä Annapurna '
        + 'South ja takana Annapurna I:n eteläseinä. Ryhmässä on yksi yli '
        + 'kahdeksantuhannen metrin huippu ja kolmetoista yli seitsemän '
        + 'tuhannen.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Panorama from poonhill-2019-BJ.jpg',
      selite: 'Aamupanoraama Poon Hillistä. Vasemmalta oikealle nousevat '
        + 'Gurja, Dhaulagirin huiput, Tukche ja Nilgiri — Dhaulagiri itse '
        + 'kohoaa 8 167 metriin.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Machapuchare Himal-3797.jpg',
      selite: 'Machapuchare eli Kalanpyrstö auringonnousussa. Vuori on '
        + 'Nepalissa pyhä, eikä sen huipulle ole annettu kiipeämislupaa — se '
        + 'on yksi harvoista suurista huipuista, joilla kukaan ei ole käynyt.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Machhapuchhre or Fishtail Mountain 6,993 m (22,943 ft)- IMG 5246.jpg',
      selite: 'Machhapuchhre (6 993 m) Annapurnan perusleiristä. Nimi '
        + 'tarkoittaa kalanpyrstöä: kaksihuippuinen harja näyttää siltä '
        + 'sivusta katsottuna.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Ama Dablam, Nepal.jpg',
      selite: 'Ama Dablam luoteesta Pherichen kylän luota. Nimi tarkoittaa '
        + '"äidin kaulakorua": harjanteet ovat kädet ja rinteen riippuva '
        + 'jäätikkö se koru.',
      lahde: 'Vyacheslav Argenberg, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: '160316-031 Bridge near Tatopani.jpg',
      selite: 'Riippusilta Kali Gandakin yli Tatopanin lähellä, taustalla '
        + 'Nilgiri South (6 839 m). Kuormahevoset ovat yhä tavallinen '
        + 'kulkuneuvo siellä, minne tie ei nouse.',
      lahde: 'Faj2323, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Kagbeni Mustang-WLV-0741.jpg',
      selite: 'Kagbenin kylä Ylä-Mustangissa Kali Gandakin laaksossa. Talot '
        + 'on rakennettu kiinni toisiinsa savesta ja kivestä, koska laakson '
        + 'läpi puhaltaa päivittäin voimakas tuuli.',
      lahde: 'Bijay Chaurasia, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Everest, Himalayas.jpg',
      selite: 'Mount Everest lähikuvassa: maailman korkein vuori 8 849 '
        + 'metriin. Huipulta lähtevä lumisuihku kertoo suihkuvirtauksesta, '
        + 'joka pyyhkii harjaa suurimman osan vuodesta.',
      lahde: 'Vyacheslav Argenberg, Wikimedia Commons (CC BY 4.0)',
    },
  ],

  karakoram: [
    {
      tiedosto: 'The Mighty K2 PAkistan.jpg',
      selite: 'K2 Concordian jäätiköiden risteyksestä. Maailman toiseksi '
        + 'korkein vuori (8 611 m) on jyrkempi ja vaarallisempi kuin Everest, '
        + 'eikä sitä ole koskaan noustu talvella ilman lisähappea.',
      lahde: 'Maqsood aktar, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: "Hunza Valley, view from Eagle's Nest.jpg",
      selite: 'Hunzan laakso Gilgit-Baltistanissa Eagle\'s Nestistä nähtynä. '
        + 'Näkymässä ovat Rakaposhi, Baltitin ja Altitin linnoitukset sekä '
        + 'Hunzan ja Nagarin jokien yhtymäkohta — Silkkitien haara kulki '
        + 'tästä laaksosta.',
      lahde: 'Alllexxxis, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Aerial view of Baltoro range.jpg',
      selite: 'Baltoron jäätikkö ilmasta. Tummat juovat ovat moreenia eli '
        + 'jäätikön kuljettamaa kiviainesta, ja niiden mutkista näkee, miten '
        + 'sivujäätiköt liittyvät päävirtaan.',
      lahde: 'Tariq hameed sulemani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Biafo hisper glaciers , baltoro , pakistan.jpg',
      selite: 'Biafon ja Hisparin jäätiköt kohtaavat. Yhdessä ne muodostavat '
        + 'yli sadan kilometrin jäätie, joka on napa-alueiden ulkopuolen '
        + 'pisimpiä.',
      lahde: 'Tariq hameed sulemani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Broad Peak and K2.jpg',
      selite: 'Broad Peak ja K2 matkalla K2:n perusleiriin. Neljä '
        + 'kahdeksantuhattametristä huippua on täällä muutaman kymmenen '
        + 'kilometrin säteellä.',
      lahde: 'Sallahuddin shah, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Western Karakorams Aerial View.jpg',
      selite: 'Läntinen Karakoram ilmasta. Etualan harjanne kuuluu vielä '
        + 'Himalajaan, ja niiden välissä kulkee Indusjoen laakso — takana '
        + 'oleva jono on Rakaposhi-Haramoshin harjanne.',
      lahde: 'Moiz Ismaili, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Sunset in mountains of Pakistan.jpg',
      selite: 'Auringonlasku Paun vuorilla Skardun lähellä. Säteet lähtevät '
        + 'harjanteen takaa viuhkana, kun laakso on jo varjossa.',
      lahde: 'Muhammad Nazir Baltistani, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Goma Village, Ghanche, Gilgit and Baltistan, Pakistan.JPG',
      selite: 'Ilta Goman kylässä Ghanchen piirikunnassa juuri ennen talven '
        + 'tuloa. Kylät ovat laaksonpohjissa, koska ylempänä ei kasva mitään.',
      lahde: 'Abrarwyne, Wikimedia Commons (CC BY-SA 3.0)',
    },
    {
      tiedosto: 'Karakoram2 K2.jpg',
      selite: 'Baltoron jäätikkö ja sen takana K2 keskellä, Broad Peak '
        + 'oikealla. Jäätikön pinta on lumen alla railoinen, ja reitti sen '
        + 'yli on merkittävä joka kevät uudelleen.',
      lahde: 'Abbas Shah1, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'The Wildlife of Karakoram.jpg',
      selite: 'Jakki jäätyneen puron yläpuolella Khunjerabin lähellä. Jakki '
        + 'on Karakoramin kuormajuhta: se kestää ohuen ilman korkeuksissa, '
        + 'joissa hevonen ei enää kulje.',
      lahde: 'Tanzeel Khan, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],

  kaukasus: [
    {
      tiedosto: 'Селение Ний.jpg',
      selite: 'Niyn kylän vainah-tornit Ingušiassa. Tornit olivat yhtä aikaa '
        + 'asuntoja ja linnoituksia, ja samaa rakennustapaa on kaikkialla '
        + 'Ingušiassa ja Tšetšeniassa. Taustan huiput ovat pilven peitossa.',
      lahde: 'Altushkin, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'View of Stepantsminda.jpg',
      selite: 'Stepantsminda Kvemi Mtan rinteeltä 2 170 metristä nähtynä. '
        + 'Vasemmalla kohoaa Khuro (4 071 m) ja takana Šanin valkoinen '
        + 'huippu (4 451 m).',
      lahde: 'WaltDisno, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Утро в горах Кавказа.jpg',
      selite: 'Aamu Kaukasuksen vuorilla: aurinko osuu ensin ylärinteiden '
        + 'niittyihin, kun laakson pohja on vielä varjossa.',
      lahde: 'Ilja Bunin, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Тебердинский заповедник. Вид на ледник и перевал Птыш.jpg',
      selite: 'Teberdan luonnonsuojelualue Luoteis-Kaukasuksella: jäätikkö ja '
        + 'Ptyšin sola syyskuussa, kun rinteiden lehtipuut ovat jo ruskassa.',
      lahde: 'Aleksandr Baidukov, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Mountains near Karadla.jpg',
      selite: 'Kevätaurinko Karadlan yllä: lumiset huiput nousevat metsäisen '
        + 'laakson yläpuolelle, ja kevään sulamisvedet ovat vielä matkalla '
        + 'alas.',
      lahde: 'M. S. Gorbunova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Qalayxudat, Guba.jpg',
      selite: 'Vuoristotie Qalayxudatin kylälle Quban seudulla '
        + 'Azerbaidžanissa. Talvella tie on ainoa yhteys kylään, ja se kulkee '
        + 'lumihuippujen juurella.',
      lahde: 'Judaideep, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Balakən District Nature - View of the Greater Caucasus Mountains.jpg',
      selite: 'Suur-Kaukasuksen vihreitä selänteitä Balakənin piirikunnassa '
        + 'Luoteis-Azerbaidžanissa. Metsäraja jää alas, ja ylin vyöhyke on '
        + 'pelkkää laidunniittyä.',
      lahde: 'Golden, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Balakən District Nature - River Cutting through the Greater Caucasus Mountains.jpg',
      selite: 'Vuoristopuro on leikannut uoman Suur-Kaukasuksen laaksoon '
        + 'Balakənin piirikunnassa. Kuva on kesäkuulta, ja laakson pohjalla on '
        + 'yhä lunta.',
      lahde: 'Golden, Wikimedia Commons (CC BY 4.0)',
    },
    {
      tiedosto: 'Mt Turklitau. Border between Levashinsky and Gunibsky District.jpg',
      selite: 'Turklitau-vuoren itäsivu Dagestanissa. Eteläinen rinne on '
        + 'lähes kasviton, ja vuori jatkuu paljon pidemmälle kuin kuvaan '
        + 'mahtuu.',
      lahde: 'M. S. Gorbunova, Wikimedia Commons (CC BY-SA 4.0)',
    },
    {
      tiedosto: 'Mountains near Karadla 2.jpg',
      selite: 'Vuoristotie kiertää rinnettä Karadlan lähellä. Vastapäätä '
        + 'nousee lumihuippu, ja tien ja huipun välissä on koko laakso.',
      lahde: 'M. S. Gorbunova, Wikimedia Commons (CC BY-SA 4.0)',
    },
  ],
};

/**
 * Kohteen kuvat maastonimen avaimella, tai null jos kohdetta ei ole
 * vielä kuratoitu.
 *
 * Null eikä tyhjä taulukko: kutsuja erottaa "ei kuratoitu" (näytä
 * Wikipedian oma kuvasto) ja "kuratoitu tyhjäksi" toisistaan.
 */
export function vuorikuvat(avain) {
  const kuvat = VUORIKUVAT[avain];
  return kuvat?.length ? kuvat : null;
}
