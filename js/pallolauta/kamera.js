/*
 * PALLOLAUDAN KAMERA — Kartta.ajaKameran vastine karttapallolle.
 *
 * Raamattu (KARTTAPALLO ON PELILAUTA, omistaja 5.9.2026): pallo on
 * pelin lauta, ja kamera-ajot — ennakkozoomi, saatto, kohdesovitus,
 * sukellus kaupunkiin — kulkevat samaa rajapintaa kuin tasokartalla,
 * jotta js/ui.js:n koreografia ei tiedä laudasta mitään
 * (docs/moduulit/karttapallo.md luku 5). ui.kamera() valitsee tämän tai
 * js/kartta.js:n Kartta-olion sen mukaan, kumpi lauta on hereillä.
 *
 * SAMA ALLEKIRJOITUS: ajaKamera({ x, y, leveys | kerroin } | { bbox,
 * marginaali }, { kesto, pehmennys }), kameranTila, kameraAjossa,
 * pysaytaKameraAjo, siirtoZoomiKerroin ja nakyvaAlue — kaikki laudan
 * yksiköissä. Kumpikaan lauta ei kutsu toisen sisäisiä metodeja.
 *
 * ── YKSI TOTUUS: LAUDAN (x, y) ────────────────────────────────────
 *
 * Pallo ei tallenna omia koordinaatteja mihinkään: asteet lasketaan
 * laudan koordinaateista (js/fokusmitat.js laudaltaAsteiksi) ja takaisin
 * (projisoiLaudalle). Näin tallennus, moveOptions, pixelOf ja pelisäännöt
 * pysyvät lautayksiköissä, ja `?lauta=kartta` antaa täsmälleen saman
 * pelin.
 *
 * ── NÄKYVÄ LEVEYS ↔ KORKEUS ───────────────────────────────────────
 *
 * Kartan ajot pyytävät `leveys` (lautayksikköä ruudun leveydellä).
 * Pallolle (karttapallo.md luku 5):
 *
 *   korkeus(leveysYks) = (leveysYks · 360/12000) / (kuvasuhde · 2 · tan(fov/2) · 180/π)
 *
 * eli Globe.gl:n oletus-fovilla 50° ≈ leveysYks / (1780 · kuvasuhde). Kaava
 * on tasokuva, tarkka vain pienillä korkeuksilla; suurilla käytetään pallon
 * geometriaa (näkyvä kaari = 2·acos(1/(1+h)), eli h = 1/cos(kaari/2) − 1),
 * ja kummastakin otetaan se, joka vaatii korkeamman kameran — molemmat
 * ovat kasvavia, joten käänteinen on niiden käänteisten minimi.
 * Kaukaisin korkeus on 2,5 (koko pallo); lähin sidotaan laattojen
 * tarkkuuteen (Z8 182 px/aste, enintään 2× venytys → ~70 yksikköä).
 *
 * KUVASUHDE ON PAKOLLINEN OSA KAAVAA (korjattu 5.9.2026, omistajan
 * palaute *"kartan zoom taso heti aloituksessa lähemmäksi"*). Globe.gl:n
 * fov on PYSTYSUUNNAN avauskulma, joten ilman kuvasuhdetta kaava asetti
 * pyydetyn leveyden ruudun KORKEUDELLE: työpöydällä (1379 × 826) ruudulla
 * näkyi 1,67-kertainen kaista pyydettyyn nähden ja puhelimella (374 × 777)
 * vain 0,48-kertainen — sama pyyntö tarkoitti eri asiaa eri laitteella, ja
 * bbox-rajaus (kameranKohde) laski korkeusehdon täsmälleen väärinpäin.
 * `kuvasuhde` = kotelon leveys / korkeus; oletus 1 pitää yksikkötestien
 * ja apufunktioiden vanhan merkityksen (neliöruutu), ja laudan kamera
 * antaa aina kotelon oman suhteen. Mitatut seuraukset ja vakioiden
 * kalibrointi: docs/moduulit/karttapallo.md luku 10.3.
 *
 * ── TRAPETSI, EI CUBIC.INOUT ──────────────────────────────────────
 *
 * Globe.gl:n oma pointOfView-tween on Cubic.InOut eikä tunne SIIRRON
 * KOREOGRAFIAN trapetsia (js/siirtokoreografia.js siirtoajonPehmennys), eikä sitä voi
 * keskeyttää kirjaamalla välivaihe. Ajo lasketaan siksi itse kehys
 * kerrallaan requestAnimationFramessa ja kirjoitetaan pointOfView(pov, 0)
 * — sama koodi kuin pallon liuku (js/pallo.js). Korkeus interpoloidaan
 * logaritmisesti kuten kartan mittakaava (silmä lukee zoomista suhteen).
 * Ele keskeyttää: sormi koteloon pysäyttää ajon siihen, mihin se ehti.
 * Reduced motion: ajo on hyppy (kesto 0).
 */

import { laudaltaAsteiksi, projisoiLaudalle } from '../fokusmitat.js';
/*
 * Saapumisasento (kaupunki alimpaan kolmannekseen) on YHTEINEN
 * kaava molemmille laudoille — js/saapumisasento.js. Se on puhdas
 * moduuli ilman DOMia ja ilman lautaa, joten tuonti ei paina mitään.
 */
import { saapumisenPallonKohta } from '../saapumisasento.js';
import { pixelOf } from '../rules.js';
/*
 * Ajon kesto ja pehmennys samasta koreografiasta kuin tasokartalla.
 * sovitaAjonKesto MUUTTI OSOITETTA 5.9.2026 (laiskoituserä 5b): se asui
 * js/kartta.js:ssä, ja tämä yksi tuonti olisi vetänyt koko tasokartan
 * (219 kt) muistiin heti pallolaudan avautuessa.
 */
import { siirtoajonPehmennys, sovitaAjonKesto } from '../siirtokoreografia.js';

/** Globe.gl:n kameran oletusavauskulma (astetta, pystysuunta). */
export const PALLO_FOV = 50;
/** Kaukaisin korkeus: koko pallo ruudulla. */
export const PALLO_KORKEUS_MAX = 2.5;
/**
 * Lähin korkeus OLETUKSENA: Z8-laatat enintään 2× venytettyinä 390 css-
 * pikselin ruudulla dpr 2:lla (≈ 2,1° ≈ 70 lautayksikköä). Laudan oma
 * kamera EI käytä tätä vaan laskee rajan laitteesta ja laattaluettelon
 * syvimmästä tasosta (lahinKorkeus alempana); tämä on kaavan vara, kun
 * kutsuja ei kerro laitetta (testit, apufunktiot).
 */
export const PALLO_KORKEUS_MIN = 0.04;
/** Laatan sivu pikseleinä (sw.js:n ja tee-pallolaatat.mjs:n LAATTA). */
export const LAATAN_PIKSELIT = 256;
/**
 * Rasterin terävyysraja: montako laitepikseliä yhtä laatan pikseliä
 * kohden maasto kestää ennen kuin se näyttää pehmeältä. 2 = laatan
 * pikseli kahtena (karttapallo.md luku 6). EI ENÄÄ ZOOMIN RAJA (v1649):
 * viivat ovat vektoreita, joten kamera saa mennä tämän ohi — luku jää
 * vertailukohdaksi mittauksiin (laattojenVenytys).
 */
export const PALLON_SALLITTU_VENYTYS = 2;
/** Maailmankartan laudan leveys lautayksikköinä (360°). */
export const PALLOLAUDAN_LEVEYS = 12000;
/** Pallon oma lauta: ainoa, jolla on maantieteellinen projektio. */
export const PALLOLAUDAN_LAUTA = 'maailmankartta';
/**
 * Saapumisen näkymä kaupungin yllä lautayksikköinä ruudun leveydellä.
 * Tasokartan saapumisporras on 58–88 yksikköä, mutta pallon Z8-laatat
 * ovat siinä jo venytettyjä; 240 näyttää kaupungin ympäristön
 * (~7°, ~1300 px Z8:aa) terävänä. Kalibroidaan omistajan laitteella.
 */
export const PALLOLAUDAN_SAAPUMISLEVEYS = 240;
/*
 * SAAPUMISRAJAUKSEN MARGINAALI (omistaja 11.9.2026 ilta, sanatarkasti:
 * *"Kartta saisi muuten zoomautuu niin kun saavutaan uuteen kaupunkiin
 * niin että maa näkyy mahdollisimman isoksi zoomattuna näytöllä"*).
 *
 * "Mahdollisimman isona" tarkoittaa maan laatikkoa ruutuun sovitettuna
 * MOLEMMISSA suunnissa (kameranKohde laskee korkeusehdon leveydeksi
 * kuvasuhteella), joten marginaali on pieni: se on vain se rako, joka
 * estää maan rajaa osumasta kiinni ruudun laitaan ja kartuutsiin.
 * Osuus laatikon sivusta joka reunalla.
 */
/*
 * TIUKENNETTU (erä 13, omistaja 14.9.2026 sanatarkasti: *"kartta
 * zoomautuu liian kauas. pitaa rajautua aivan rajojen ulkopuolelle."*,
 * Raamattu KARTTAUUDISTUKSEN PÄÄTÖKSET 12 kohta 5).
 *
 * 0,05 tarkoitti 10 % tyhjää (1 + 2 × 0,05), mutta MITATTU tyhjä tila
 * oli Ranskassa 34,6 % (390 × 844) ja 27,5 % (1400 × 900) — marginaali
 * ei ollut syy vaan rajauksen mitta: laatikkoa verrattiin laudan
 * Mercator-yksiköihin eikä pallon perspektiiviin (ks. `pallonKorkeus`).
 * Kun korkeus ratkaistaan perspektiivistä, marginaali tarkoittaa taas
 * sitä mitä lupaa.
 *
 * LUKU ON 0,01 EIKÄ 0,015, KOSKA TYHJÄ EI JAKAUDU TASAN. Vara sitoo
 * sen laatikon reunan, joka on ruudun keskipisteestä kauimpana, ja
 * kamera osoittaa laatikon KESKIPISTEESEEN laudan yksiköissä — pallon
 * projektiossa keskipiste ei ole reunojen puolivälissä, joten toiselle
 * reunalle jää hitusen enemmän tilaa. MITATTU Ranskassa varalla 1,03:
 * tyhjää 2,05 % (390 × 844) ja 3,94 % (1400 × 900). Varalla 1,02
 * kumpikin mahtuu kolmeen prosenttiin.
 */
export const SAAPUMISRAJAUKSEN_MARGINAALI = 0.01;
/*
 * SAAPUMISRAJAUKSEN KATTO lautayksikköinä (2000 = 60° pituuspiiriä).
 *
 * PALLO EI OLE KARTTA. Venäjä on 171° leveä ja Yhdysvallat 121°:
 * kumpaakaan ei voi näyttää pallolta kokonaan, koska pallosta näkyy
 * kerrallaan vajaa puolikas ja reunaa kohti maa litistyy olemattomiin.
 * "Maa mahdollisimman isona" ei siis voi tarkoittaa niitä — rajaus
 * karkaisi maailmankuvaksi, jossa saapumiskaupunki on piste.
 *
 * KATTO ON KAMERAN RAJA, EI MAKUASIA: 60 astetta on se, minkä yli
 * pallon kaarevuus alkaa syödä laatikon reunoja. Sen ylittävä maa saa
 * entisen kaupunkinäkymän (PALLOLAUDAN_SAAPUMISLEVEYS), joka on
 * pelattava. Pelin 112 maasta katon ylittää viisi: RUS, USA, CAN, GRL
 * ja CHN (mitattu 11.9.2026).
 */
export const SAAPUMISRAJAUKSEN_MAX = 2000;
/*
 * KATON VARA ON OMA VAKIONSA (erä 13). Katto vastaa kysymykseen
 * *"näkyykö tämä maa pallolta ollenkaan"*, ja sen vastaus jakaa maat
 * kahteen pysyvään joukkoon (RUS, USA, CAN, GRL, CHN saavat
 * kaupunkinäkymän). Ennen erää 13 katto laskettiin
 * SAAPUMISRAJAUKSEN_MARGINAALIsta, jolloin rajauksen tiukentaminen
 * olisi liikuttanut myös tuota joukkoa — kaksi eri asiaa yhdessä
 * luvussa. Arvo on erää 13 edeltänyt 1 + 2 × 0,05, jotta joukko pysyy
 * täsmälleen ennallaan (tests/maakartuutsi.test.mjs vartioi sitä).
 */
export const SAAPUMISRAJAUKSEN_KATTOVARA = 1.10;
/*
 * ======== ULOSZOOMAUKSEN ESTO (KARTTAUUDISTUS, ERÄ 2) ==============
 *
 * Omistaja 13.9.2026: *"kartta zoomaa automaattisesti maan niin
 * suureksi kuin mahdollista. Pelaaja ei voi itse zoomata ulospain,
 * ainoastaan sisaanpain"*; PÄÄTÖKSET 2: *"se etta ulospain ei pysty
 * zoomaamaan oli muuten siita ideasta, etta kartta saisi nayttaa
 * staattiselta"*. PÄÄTÖKSET 1 laski kertoimen 3 → 1,15.
 *
 * KERROIN EI SAA YLITTÄÄ VÄRILAATASTON LAATIKKOA
 * (tools/generoi-laattapyramidi.mjs `--laatikkokerroin` 1,15), ja se on
 * ehto eikä varmuusvara: värilaatasto kattaa maan laatikon × 1,15, ja
 * jos kamera pääsisi kauemmas, feidattu laatikko näkyisi
 * suorakaiteena keskellä seepiaa. Siksi erät 1b ja 2 ovat sama PR.
 *
 * ERÄSSÄ 13 KERROIN ON 1,02 EIKÄ 1,15 (omistaja 14.9.2026: *"kartta
 * zoomautuu liian kauas"*). PIENEMPI KERROIN ON LAATTAKATTAVUUDEN
 * SISÄLLÄ — värilaatasto kattaa yhä 1,15 — joten ehto pitää; vanha
 * kommentti väitti lukujen olevan sama luku, mikä oli totta vain
 * niin kauan kuin kumpaakaan ei tiukennettu. EHTO ON YLÄRAJA:
 * kerroin ≤ 1,15.
 *
 * KERROIN ON SAMA KUIN SAAPUMISEN VARA (1 + 2 × 0,01 = 1,02), jotta
 * uloszoomaus ei pääse saapumisnäkymää kauemmas yhdelläkään ruudulla
 * (erässä 12 jäi työpöydälle 4,5 % varaa 1,15 vs. 1,10).
 */
export const ULOSZOOMAUKSEN_KERROIN = 1 + 2 * SAAPUMISRAJAUKSEN_MARGINAALI;

/*
 * ══════════════════════════════════════════════════════════════════
 * PANOROINNIN RAJA (KARTTAUUDISTUS, ERÄ 9)
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistaja 13.9.2026 klo 17.50 UTC (kuvakaappaus Ranskasta):
 * *"Ja rajaa liikkuminen pienemmälle alalla."* Löydös oli kirjattu jo
 * erässä 1c (docs/raportit/viesti-fable-karttauudistus-era1c-*.md luku
 * 9.6): uloszoomauksen esto on pelkkä KORKEUSRAJA, ja pituusasteella
 * ei ollut mitään rajaa — pelaaja saattoi vetää Ranskasta Japaniin
 * uloimmalla sallitulla zoomilla.
 *
 * KERROIN ON 1,3 JA SE KOSKEE KAMERAN KESKIPISTETTÄ. Sallittu ala on
 * saapumislaatikko (maa + maapaneeli) × 1,3 laatikon keskipisteen
 * ympäri, ja siihen puristetaan kameran KESKIPISTE — ei näkyvää
 * aluetta. Näkyvä ala saa siis ulottua laatikon ulkopuolelle (muuten
 * uloin zoomi ei mahtuisi liikkumaan lainkaan), mutta kohdemaa ei voi
 * kadota ruudulta.
 *
 * MIKSI ISOMPI KUIN ULOSZOOMAUKSEN 1,15. Uloszoomauksen kerroin rajaa
 * KORKEUTTA (koko laatikko ruudulla); tämä rajaa keskipisteen
 * liikettä. Sama luku tekisi liikkumavarasta niin kapean, ettei maan
 * reunaa voisi tuoda ruudun keskelle lähemmällä zoomilla.
 */
export const PANOROINNIN_KERROIN = 1.3;
/**
 * Siirtonäkymän lähin leveys (siirtoZoomiKerroin): ennakkozoomi vie
 * SIIRTOZOOMIN_LAHENNYS kertaa lähemmäs, mutta ei tämän alle. Puolet
 * saapumisleveydestä eli yksi lähennys saapumisnäkymästä (~3,6°, Z8 noin
 * 1,8× venytettynä iPhonen dpr 3:lla) — siitä eteenpäin laatat sumenevat.
 */
export const PALLOLAUDAN_SIIRTOLEVEYS = 120;
/** Sukellus kaupunkiin: sama kesto kuin valikkopallon sukelluksella. */
export const PALLOKAMERAN_AJO_MS = 1400;
/*
 * ══ LIUSKAN AVAUSAJO LÄHTEE HETI (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 34 kohta 14 a; omistaja 18.9.2026 iPhone-kuvasta v1936:
 * *"Kartta pitaisi siirtya heti napautuksen jalkeen. Nyt siina on
 * turhan pitka tauko ennen kuin liike tapahtuu."*)
 * ═══════════════════════════════════════════════════════════════════
 *
 * MITATTU SYY EI OLLUT VIIVE VAAN KÄYRÄ. Napautuksen ja `ajaKamera`n
 * välissä ei ole odotusta (js/pallolauta/lauta.js napautaKaupunki ajaa
 * saman kehyksen sisällä), mutta ajo kesti PALLOKAMERAN_AJO_MS = 1400
 * ms trapetsilla, jonka kiihdytysramppi on 30 % kestosta: sadassa
 * millisekunnissa oli kuljettu 0,5 % matkasta eli noin pikseli. Silmä
 * lukee sen taukona, ei liikkeenä.
 *
 * KAKSI LUKUA, SAMA PÄÄTÖS. Kesto on 420 ms (kohta 10 vaatii alle 600
 * ms, ja liuska avautuu vasta ajon jälkeen), ja ramppi on 0,12 — sama
 * trapetsi kuin muissa ajoissa, mutta niin lyhyellä kiihdytyksellä,
 * että sadan millisekunnin kohdalla on kuljettu jo viidennes matkasta.
 * Muut ajot (saapuminen, siirto) EIVÄT muutu: tämä on vain liuskan
 * avauksen oma ajo.
 */
export const LIUSKAN_AJO_MS = 420;
export const LIUSKAN_AJON_RAMPPI = 0.12;
export const LIUSKAN_PEHMENNYS = (t) => siirtoajonPehmennys(t, LIUSKAN_AJON_RAMPPI);

/** Lautayksiköt asteiksi pituuspiirin suunnassa. */
export function asteetLeveydesta(leveysYks, laudanLeveys = PALLOLAUDAN_LEVEYS) {
  return (leveysYks * 360) / laudanLeveys;
}

/** Tasokuvan kerroin: astetta korkeusyksikköä kohti. */
function tasokuvanKerroin(fov) {
  return 2 * Math.tan((fov / 2) * (Math.PI / 180)) * (180 / Math.PI);
}

/**
 * Näkyvä leveys (lautayksikköä) → Globe.gl:n altitude.
 *
 * `kuvasuhde` = kotelon leveys / korkeus. Fov on pystysuunnan kulma,
 * joten pyydetty LEVEYS jaetaan kuvasuhteella ennen kuin se muutetaan
 * korkeudeksi; oletus 1 = neliöruutu (yksikkötestit, apufunktiot).
 */
export function korkeusLeveydesta(leveysYks, {
  fov = PALLO_FOV, laudanLeveys = PALLOLAUDAN_LEVEYS, min = PALLO_KORKEUS_MIN, kuvasuhde = 1,
} = {}) {
  if (!(leveysYks > 0)) return PALLO_KORKEUS_MAX;
  const asteet = asteetLeveydesta(leveysYks, laudanLeveys);
  const taso = asteet / (Math.max(0.01, kuvasuhde) * tasokuvanKerroin(fov));
  // Pallon geometria: kaari mahtuu näkyviin vasta, kun horisontti on
  // sen takana. Yli 180° kaari ei mahdu koskaan → katto.
  const kaari = asteet < 180 ? 1 / Math.cos((asteet / 2) * (Math.PI / 180)) - 1 : Infinity;
  return Math.min(PALLO_KORKEUS_MAX, Math.max(min, Math.max(taso, kaari)));
}

/*
 * ── LÄHIN NÄKYVÄ LEVEYS ON VAKIO, EI LAATTOJEN TARKKUUS ───────────
 *
 * OMISTAJAN PALAUTE v1649 (sanatarkasti): *"Voisiko syvemmin zoomin
 * sallia jo nyt vaikka korkeusdataa ei ole mutta rajat varmaan
 * piirtyvät terävänä kun on vektori"*.
 *
 * MIKSI RAJA SAA SYVETÄ. v1649 toi pallolle vektoriviivat
 * (js/pallovektorit.js): rantaviiva ja rajat piirretään ruudun
 * pikseliksi millä tahansa korkeudella, eivät laatan pikseliksi. Kuvan
 * TERÄVYYS ei siis enää tule laattatasosta — laatta antaa vain maaston
 * värin, joka saa olla pehmeä. Aiemmin lähin leveys laskettiin
 * laattatarkkuudesta (venytys enintään PALLON_SALLITTU_VENYTYS = 2), ja
 * se on nyt väärä mitta: se rajasi zoomin sinne, missä RASTERI on
 * terävä, vaikka silmä katsoo viivaa.
 *
 * VAKIO EIKÄ LAITEKOHTAINEN LUKU. Vanha kaava antoi lähimmäksi
 * leveydeksi puhelimella 107 yksikköä ja isolla ruudulla katon
 * PALLOLAUDAN_SIIRTOLEVEYS 120 — sama ele vei eri laitteilla eri
 * syvyyteen. Uusi raja on yksi luku kaikille: PALLOLAUDAN_LAHIN_LEVEYS,
 * puolet vanhasta katosta (120 → 60 lautayksikköä ≈ 1,8°). Yksi
 * nipistys entisestä pohjasta vie siis vielä yhden portaan syvemmälle.
 *
 * VENYTYS uudessa rajassa (laattojenVenytys, mitattu 6.9.2026):
 * pyramidin syvin taso z8 antaa 480 px/aste, ja lähin näkymä on 1,8°
 * ruudun leveydellä. Puhelin 390 css × dpr 3 = 1170 px → 650 px/aste →
 * venytys 1,4×; iPad 834 × 2 = 1668 px → 1,9×; työpöytä 1440 × 2 =
 * 2880 px → 3,3×. Maasto on silloin pehmeä (PALLON_SALLITTU_VENYTYS 2
 * ylittyy isolla ruudulla), viivat teräviä — juuri se, mitä omistaja
 * pyysi. Kun korkeusdata ja syvempi pyramiditaso joskus tulevat, sama
 * vakio kestää: venytys pienenee itsestään.
 *
 * SIIRTONÄKYMÄ EI SYVENE: PALLOLAUDAN_SIIRTOLEVEYS (120) on yhä
 * siirtokoreografian ennakkozoomin katto (siirtoZoomiKerroin), joten
 * pelin oma koreografia pysyy täsmälleen ennallaan; vain pelaajan oma
 * nipistys pääsee syvemmälle. Tasokartan oma raja (js/kartta.js
 * ZOOMI_LAHIN 88) on eri vakio eikä muutu.
 */
/** Laattatason tarkkuus pikseleinä astetta kohden (Z8 = 182). */
/**
 * KOKO PALLO RUUTUUN — kameran korkeus pallonsäteinä.
 *
 * PUHDAS FUNKTIO (tests/satelliitti-avaruus.test.mjs, tests/pallolinssit.test.mjs)
 * ja riippumaton pallon säteestä: kulma on sama olipa pallo minkä
 * kokoinen tahansa.
 *
 * Kamera on etäisyydellä d = R · (1 + korkeus). Pallon siluetin
 * kulmasäde on a = asin(R / d), ja perspektiivikuvassa sen ruutusäde on
 *
 *     r = (K / 2) · tan(a) / tan(fov / 2),
 *
 * missä K on kotelon KORKEUS pikseleinä (fov on pystykulma). Pallon on
 * mahduttava MOLEMPIIN suuntiin, joten halkaisijan katto on ruudun
 * kapeampi sivu marginaalilla vähennettynä — ja juuri tämä on se kohta,
 * joka pystyruudulla menee väärin, jos leveyttä ei katsota lainkaan.
 *
 * KAKSI LINSSIÄ LUKEE TÄTÄ: satelliittilinssin avaruusnäkymä
 * (js/linssit/satelliitti-avaruus.js avausKorkeus) ja topografialinssi,
 * jonka ajaksi zoomin minimi vapautetaan koko palloon (Raamattu,
 * TOPOGRAFIALINSSI: ... KOKO MAAPALLO KATSOTTAVISSA). Kaava on tässä
 * yhtenä totuutena eikä kopiona kahdessa linssissä.
 *
 * @param {{leveys: number, korkeus: number, fov?: number, marginaali?: number}} mitat
 * @returns {number} Globe.gl:n `altitude`
 */
export function kokoPallonKorkeus({
  leveys, korkeus, fov = PALLO_FOV, marginaali = 0.12,
} = {}) {
  const K = Number(korkeus) > 0 ? Number(korkeus) : 0;
  const L = Number(leveys) > 0 ? Number(leveys) : 0;
  if (!K || !L) return PALLO_KORKEUS_MAX;
  const m = Math.max(0, Math.min(0.6, Number(marginaali) || 0));
  const mahtuu = Math.min(L, K) * (1 - m);
  // tan(a) = (mahtuu / K) · tan(fov / 2)
  const tanA = (mahtuu / K) * Math.tan((fov / 2) * (Math.PI / 180));
  const sinA = tanA / Math.sqrt(1 + tanA * tanA);
  if (!(sinA > 0)) return PALLO_KORKEUS_MAX;
  return 1 / sinA - 1;
}

export function laatanTarkkuus(taso, laatanPikselit = LAATAN_PIKSELIT) {
  return (laatanPikselit * 2 ** taso) / 360;
}

/**
 * LÄHIN SALLITTU NÄKYVÄ LEVEYS (lautayksikköä) — vakio kaikille
 * laitteille. Puolet siirtonäkymän katosta (PALLOLAUDAN_SIIRTOLEVEYS).
 */
export const PALLOLAUDAN_LAHIN_LEVEYS = PALLOLAUDAN_SIIRTOLEVEYS / 2;

/**
 * Laattapyramidin syvimmän tason tiheys pikseleinä astetta kohti
 * (pyramidi.json 2026-09-03a: z8 leveys 172 800 px / 360° = 480). Tämä
 * on se, mitä laattakerros (js/pallolaatat.js) pallolle piirtää — pallon
 * oma Mercator-sarja (laatanTarkkuus) on enää kirjaston pohja.
 */
export const PYRAMIDIN_SYVIN_PX_ASTE = 480;

/**
 * Laattojen venytys annetulla näkyvällä leveydellä: montako
 * laitepikseliä yhtä laatan pikseliä kohti. Mittaus ja testit — peli ei
 * enää rajaa zoomia tällä (ks. yllä).
 */
export function laattojenVenytys({
  leveysPx, dpr = 1, leveysYks = PALLOLAUDAN_LAHIN_LEVEYS,
  laudanLeveys = PALLOLAUDAN_LEVEYS, pxAste = PYRAMIDIN_SYVIN_PX_ASTE,
}) {
  const laitepikselit = Math.max(1, leveysPx) * Math.max(1, dpr);
  const asteet = asteetLeveydesta(Math.max(1e-6, leveysYks), laudanLeveys);
  return laitepikselit / (asteet * Math.max(1e-6, pxAste));
}

/** Lähin sallittu näkyvä leveys (lautayksikköä). */
export function lahinLeveys({ lahin = PALLOLAUDAN_LAHIN_LEVEYS } = {}) {
  return lahin;
}

/** Lähin sallittu korkeus (altitude) lähimmästä leveydestä. */
export function lahinKorkeus(valinnat = {}) {
  const { fov = PALLO_FOV, laudanLeveys = PALLOLAUDAN_LEVEYS, kuvasuhde = 1 } = valinnat;
  return korkeusLeveydesta(lahinLeveys(valinnat), {
    fov, laudanLeveys, kuvasuhde, min: 0,
  });
}

/** Globe.gl:n altitude → näkyvä leveys lautayksikköinä (käänteinen). */
export function leveysKorkeudesta(korkeus, {
  fov = PALLO_FOV, laudanLeveys = PALLOLAUDAN_LEVEYS, kuvasuhde = 1,
} = {}) {
  const h = Math.max(1e-6, korkeus);
  const tasoAsteet = h * tasokuvanKerroin(fov) * Math.max(0.01, kuvasuhde);
  const kaariAsteet = 2 * Math.acos(1 / (1 + h)) * (180 / Math.PI);
  const asteet = Math.min(360, Math.min(tasoAsteet, kaariAsteet));
  return (asteet / 360) * laudanLeveys;
}

/** Lyhin kierto pituuspiirin suunnassa (−180…180). */
function lyhinLng(alusta, kohteeseen) {
  let d = kohteeseen - alusta;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

/**
 * Pallolaudan kamera. `pallo` on Globe.gl-instanssi, `kotelo` sen
 * DOM-kotelo (eleiden keskeytys), `ui` pelin UI (reducedMotion, kuoleman
 * lippu, nykyinen kaupunki), `heraa` kutsutaan ennen ajoa (render-silmukka
 * pois tauolta, ks. js/pallolauta/lauta.js).
 */
export function luoPallokamera({
  pallo, kotelo, ui, lauta = PALLOLAUDAN_LAUTA, laudanLeveys = PALLOLAUDAN_LEVEYS, heraa = null,
  laattataso = 7, dpr = globalThis.devicePixelRatio || 1,
}) {
  let ajo = null; // { kehys, valmis, nyt } kesken olevalle ajolle

  const ruudunLeveys = () => kotelo?.clientWidth || 1;
  const ruudunKorkeus = () => kotelo?.clientHeight || 1;
  /*
   * KUVASUHDE LUETAAN KUTSUTTAESSA, ei kerran: ruutu kääntyy, ikkuna
   * muuttaa kokoa ja lehti avautuu kotelon päälle. Sama luku menee sekä
   * leveys → korkeus että korkeus → leveys -suuntaan, joten pyydetty
   * leveys on aina lautayksikköä RUUDUN LEVEYDELLÄ.
   */
  const kuvasuhde = () => ruudunLeveys() / ruudunKorkeus();

  /*
   * LÄHIN KORKEUS VAKIOLEVEYDESTÄ (v1649). Lasketaan kutsuttaessa eikä
   * kerran: kotelon KUVASUHDE vaihtuu kääntyvällä ruudulla, ja sama
   * lautayksikkömäärä ruudun leveydellä on silloin eri korkeus.
   */
  const korkeusMin = () => lahinKorkeus({ laudanLeveys, kuvasuhde: kuvasuhde() });
  /** Näkyvä leveys → korkeus laitteen tarkkuusrajalla. */
  const korkeus = (leveysYks) => korkeusLeveydesta(leveysYks, {
    laudanLeveys, kuvasuhde: kuvasuhde(), min: korkeusMin(),
  });
  /** Korkeus → näkyvä leveys samalla kuvasuhteella. */
  const leveys = (korkeusArvo) => leveysKorkeudesta(korkeusArvo, { laudanLeveys, kuvasuhde: kuvasuhde() });

  const pysaytaKameraAjo = () => {
    if (!ajo) return false;
    const kesken = ajo;
    ajo = null;
    cancelAnimationFrame(kesken.kehys);
    kesken.valmis(false);
    return true;
  };

  // ELE KESKEYTTÄÄ (Raamattu, KAMERA-AJOT): sormi tai rulla koteloon
  // pysäyttää ajon siihen, mihin se ehti — pallo ei nykäise takaisin.
  // Rulla KAAPPAUSVAIHEESSA: panorointi (js/pallo.js asennaPallonEleet)
  // katkaisee wheelin kotelon kaappauksessa, joten kuplintaan jäänyt
  // kuuntelija ei enää saisi tapahtumaa. Saman solmun kaappaajat ajetaan
  // kaikki (stopPropagation koskee vain seuraavaa solmua).
  kotelo?.addEventListener('pointerdown', () => pysaytaKameraAjo());
  kotelo?.addEventListener('wheel', () => pysaytaKameraAjo(), { passive: true, capture: true });

  /** Näkymän tila: keskipiste laudalla, näkyvä leveys, korkeus, asteet. */
  const kameranTila = () => {
    const pov = pallo.pointOfView();
    if (!pov || !Number.isFinite(pov.lat)) return null;
    const kohta = projisoiLaudalle(lauta, pov.lng, pov.lat);
    if (!kohta) return null;
    const nakyva = leveys(pov.altitude);
    return {
      x: kohta.x, y: kohta.y, leveys: nakyva, korkeus: pov.altitude, lat: pov.lat, lng: pov.lng,
      skaala: ruudunLeveys() / nakyva,
    };
  };

  /** ui.nakyvaAlue-vastine: laatikko laudan yksiköissä + mittakaava. */
  const nakyvaAlue = () => {
    const tila = kameranTila();
    if (!tila) return null;
    const w = tila.leveys;
    const h = w * (ruudunKorkeus() / ruudunLeveys());
    return { x: tila.x - w / 2, y: tila.y - h / 2, w, h, skaala: tila.skaala };
  };

  /*
   * ══════════════════════════════════════════════════════════════════
   * LAATIKKO PALLON PINNALLA, EI MERCATORIN KARTALLA (erä 13)
   * ══════════════════════════════════════════════════════════════════
   *
   * Omistaja 14.9.2026 (Raamattu KARTTAUUDISTUKSEN PÄÄTÖKSET 12 kohta
   * 5, sanatarkasti): *"kartta zoomautuu liian kauas. pitaa rajautua
   * aivan rajojen ulkopuolelle."*
   *
   * JUURISYY ON MITATTU EIKÄ ARVATTU. Maan laatikko on LAUDAN
   * yksiköissä, ja lauta on Mercator-sukuinen: x on suoraan
   * pituusastetta (12000 yks = 360°), mutta y venyy leveyspiiriä
   * kohti. Kamera taas näyttää PALLOA, jolla
   *
   *   • pituusasteen 1° kattaa ruudulla vain cos(φ) verran siitä,
   *     mitä sama 1° kattaa päiväntasaajalla, ja
   *   • pystysuunta on todellinen leveysastekaari, ei Mercatorin
   *     venyttämä y.
   *
   * Ranskassa (φ 41,4…51,1) tämä on kaksi kertaa iso virhe: leveys
   * 489,8 yks vaatii pallolla vain 489,8 × cos 41,4° = 367 yks, ja
   * korkeus 406,3 Mercator-yksikköä on todellisuudessa 9,72° = 324 yks.
   * Kamera nousi siis noin 1,35× liian korkealle, ja MITATTU tyhjä
   * tila oli 34,6 % (390 × 844) ja 27,5 % (1400 × 900) — juuri se, mitä
   * omistaja näkee.
   *
   * RATKAISU ON SULJETTU KAAVA, EI KERROIN. Kolmiulotteinen
   * perspektiivi (three.js PerspectiveCamera, fov pystykulma) antaa
   * pisteelle (φ, λ) kameran ollessa (φ0, λ0) korkeudella h
   * yksikköpallolla:
   *
   *   syvyys = (1 + h) − [sin φ sin φ0 + cos φ cos φ0 cos Δλ]
   *   sivu   = cos φ sin Δλ
   *   pysty  = sin φ cos φ0 − cos φ sin φ0 cos Δλ
   *   ruutu  = (sivu / (tan(fov/2) · kuvasuhde), pysty / tan(fov/2)) / syvyys
   *
   * Piste on ruudulla, kun kumpikin ruutukoordinaatti on itseisarvoltaan
   * enintään 1. Ehto on h:ssa LINEAARINEN, joten tarvittava korkeus
   * ratkeaa suoraan:
   *
   *   1 + h ≥ cos(kaari) + vara · max(|sivu|/(tan·kuvasuhde), |pysty|/tan)
   *
   * ja koko laatikon korkeus on näistä suurin (laatikon kehältä
   * näytteinä). Iterointia ei tarvita, ja `vara` tarkoittaa nyt tasan
   * sitä mitä lupaa: varalla 1,02 kauimmainen laatikon reuna asettuu
   * tasan 1/1,02 = 98,0 %:iin ruudun puolikkaasta.
   *
   * MITTAUS 14.9.2026 (Ranska, ennen → jälkeen): tyhjä tila sitovalla
   * akselilla 390 × 844 ja 1400 × 900 — luvut raportissa
   * docs/raportit/viesti-fable-zoomi2-20260914.md.
   */
  const PERIMETRIN_NAYTTEET = 12;
  /** Laatikon kehän näytepisteet asteina — sama kehä kaikille mitoille. */
  const kehanAsteet = (bbox) => {
    if (!(bbox?.w > 0) || !(bbox?.h > 0)) return null;
    const ulos = [];
    for (let i = 0; i <= PERIMETRIN_NAYTTEET; i += 1) {
      const t = i / PERIMETRIN_NAYTTEET;
      const pisteet = [
        [bbox.x + bbox.w * t, bbox.y],
        [bbox.x + bbox.w * t, bbox.y + bbox.h],
        [bbox.x, bbox.y + bbox.h * t],
        [bbox.x + bbox.w, bbox.y + bbox.h * t],
      ];
      for (const [bx, by] of pisteet) {
        const a = laudaltaAsteiksi(lauta, bx, by);
        if (a && Number.isFinite(a.lat)) ulos.push({ lat: a.lat, lng: a.lon ?? a.lng });
      }
    }
    return ulos.length ? ulos : null;
  };

  /**
   * Vaadittu etäisyys (1 + korkeus) annetusta keskipisteestä, AKSELI
   * KERRALLAAN: 'X' = vain vaakasuunta sitoo, 'Y' = vain pystysuunta,
   * null = molemmat (PÄÄTÖKSET 12:n rajaus). Kaava on yllä kuvattu
   * suljettu muoto; iterointia ei tarvita.
   */
  const kehanTarve = (pisteet, lat0, lng0, vara, akseli = null) => {
    const rad = Math.PI / 180;
    const sin0 = Math.sin(lat0 * rad);
    const cos0 = Math.cos(lat0 * rad);
    const T = Math.tan((PALLO_FOV / 2) * rad);
    const A = Math.max(0.01, kuvasuhde());
    let etaisyys = 0;
    for (const piste of pisteet) {
      const lat = piste.lat * rad;
      const dLng = (piste.lng - lng0) * rad;
      const sinP = Math.sin(lat);
      const cosP = Math.cos(lat);
      const cosDl = Math.cos(dLng);
      const syvyysOsa = sinP * sin0 + cosP * cos0 * cosDl; // cos(kaari)
      const sivu = Math.abs(cosP * Math.sin(dLng)) / (T * A);
      const pysty = Math.abs(sinP * cos0 - cosP * sin0 * cosDl) / T;
      let osa = Math.max(sivu, pysty);
      if (akseli === 'X') osa = sivu;
      else if (akseli === 'Y') osa = pysty;
      const tarve = syvyysOsa + vara * osa;
      if (tarve > etaisyys) etaisyys = tarve;
    }
    return etaisyys;
  };

  const pallonKorkeus = (bbox, vara = 1) => {
    const pisteet = kehanAsteet(bbox);
    if (!pisteet) return null;
    const keski = laudaltaAsteiksi(lauta, bbox.x + bbox.w / 2, bbox.y + bbox.h / 2);
    if (!keski || !Number.isFinite(keski.lat)) return null;
    const etaisyys = kehanTarve(pisteet, keski.lat, keski.lon ?? keski.lng, vara);
    if (!(etaisyys > 1)) return null;
    return Math.min(PALLO_KORKEUS_MAX, etaisyys - 1);
  };

  /*
   * ══════════════════════════════════════════════════════════════════
   * PUHELIN PYSTYSSÄ: SAAPUMISNÄKYMÄ SOVITETAAN KORKEUTEEN (erä 14)
   * ══════════════════════════════════════════════════════════════════
   *
   * Omistaja 14.9.2026 (Raamattu KARTTAUUDISTUKSEN PÄÄTÖKSET 17): kun
   * ruudun kuvasuhde on KAPEAMPI kuin maan laatikon kuvasuhde pallolla,
   * saapumisnäkymä sovitetaan KORKEUTEEN — maa täyttää ruudun
   * pystysuunnassa (maapaneeli mukana laatikossa), pelaajan kaupunki
   * keskellä, ja maan itä- ja länsireuna jäävät aluksi ruudun
   * ulkopuolelle. Pelaaja panoroi niihin, ja panorointiraja pitää
   * laatikon reunan ruudun laidassa tai sen ulkopuolella.
   *
   * MIKSI (mitattu 14.9.2026, viesti-fable-karttabugi-20260914.md):
   * Ranskan laatikko on pallolla noin 10,2° × 9,7°, mutta puhelimen
   * kotelo on pystyssä 0,48. Molempiin suuntiin sovitettuna X sitoo ja
   * pystyyn jää 59,3 % tyhjää — ja se tyhjä täyttyy naapurimailla
   * (Britannia, Espanja, Marokko). Korkeuteen sovitettuna laatikko on
   * 138 % ruudun leveydestä.
   *
   * SITOVA AKSELI MITATAAN, EI ARVATA: sama `kehanTarve` akseli
   * kerrallaan laatikon keskipisteestä. Jos X vaatii kauemmas kuin Y,
   * laatikko on ruutua leveämpi — täsmälleen ehto *"ruudun kuvasuhde <
   * laatikon kuvasuhde pallolla"*. Muuten palautetaan null ja
   * PÄÄTÖKSET 12:n rajaus jää voimaan sellaisenaan (työpöytä, vaaka).
   *
   * X-KESKIPISTE ON PELAAJAN KAUPUNKI, RAJATTUNA. Keskipiste ei saa
   * mennä niin lähelle laatikon reunaa, että reuna tulisi ruudun
   * sisään: sallittu vyöhyke on [länsireuna + puoli, itäreuna − puoli].
   * Sama `puoli` on panoroinnin X-raja. Näin myös reunakaupunki
   * (GRC:n Ateena) pysyy ruudulla ilman omaa erikoistapausta —
   * PÄÄTÖSJONON *"painota pelaajan kaupunkia"* ratkeaa tässä.
   */
  const KORKEUSSOVITUKSEN_HAARUKAT = 24;
  const KORKEUSSOVITUKSEN_KIERROKSET = 3;
  /**
   * Pienin |Δlng| (asteina) laatikon reunameridiaanista kameran
   * keskipisteeseen, jolla KOKO reunameridiaani on vielä ruudun
   * laidassa tai sen ulkopuolella, kun kamera on etäisyydellä
   * `etaisyys` (= 1 + korkeus).
   *
   * Ehto on pisteittäin `syvyysOsa + sivu ≥ etaisyys` (sama suljettu
   * kaava varalla 1, vain X-akseli) ja se on u:ssa KASVAVA koko
   * käytännön alueella — kääntyy vasta kun tan u = 1/(T·A·cos φ0), eli
   * puhelimella u ≈ 80° — joten haarukointi on turvallinen.
   */
  const reunanPuoli = (latMin, latMax, lat0, etaisyys) => {
    const rad = Math.PI / 180;
    const sin0 = Math.sin(lat0 * rad);
    const cos0 = Math.cos(lat0 * rad);
    const T = Math.tan((PALLO_FOV / 2) * rad);
    const A = Math.max(0.01, kuvasuhde());
    const pieninTarve = (u) => {
      const cosDl = Math.cos(u * rad);
      const sinDl = Math.sin(u * rad);
      let pienin = Infinity;
      for (let i = 0; i <= PERIMETRIN_NAYTTEET; i += 1) {
        const lat = (latMin + ((latMax - latMin) * i) / PERIMETRIN_NAYTTEET) * rad;
        const sinP = Math.sin(lat);
        const cosP = Math.cos(lat);
        const tarve = sinP * sin0 + cosP * cos0 * cosDl + (cosP * sinDl) / (T * A);
        if (tarve < pienin) pienin = tarve;
      }
      return pienin;
    };
    let ala = 0;
    let yla = 90;
    if (!(pieninTarve(yla) >= etaisyys)) return yla;
    for (let i = 0; i < KORKEUSSOVITUKSEN_HAARUKAT; i += 1) {
      const keski = (ala + yla) / 2;
      if (pieninTarve(keski) >= etaisyys) yla = keski;
      else ala = keski;
    }
    return yla;
  };

  /** Pelaajan kaupungin asteet (X-keskipisteen toive) tai null. */
  const pelaajanAsteet = () => {
    const { game } = ui ?? {};
    const pos = game?.player?.pos;
    if (!pos || !game.board) return null;
    const kohta = pixelOf(game.board, pos);
    if (!Number.isFinite(kohta?.x)) return null;
    const a = laudaltaAsteiksi(lauta, kohta.x, kohta.y);
    return a && Number.isFinite(a.lat) ? { lat: a.lat, lng: a.lon ?? a.lng } : null;
  };

  /**
   * Korkeuteen sovitettu saapumisnäkymä tai null, jos ruutu ei ole
   * laatikkoa kapeampi (silloin PÄÄTÖKSET 12:n rajaus on voimassa).
   * Palauttaa korkeuden, keskipisteen ja laatikon reunat asteina.
   */
  const korkeuteenSovitus = (bbox, vara = 1) => {
    const pisteet = kehanAsteet(bbox);
    if (!pisteet) return null;
    const keski = laudaltaAsteiksi(lauta, bbox.x + bbox.w / 2, bbox.y + bbox.h / 2);
    const lansi = laudaltaAsteiksi(lauta, bbox.x, bbox.y + bbox.h / 2);
    const ita = laudaltaAsteiksi(lauta, bbox.x + bbox.w, bbox.y + bbox.h / 2);
    if (!keski || !lansi || !ita || !Number.isFinite(keski.lat)) return null;
    const lat0 = keski.lat;
    const lngKeski = keski.lon ?? keski.lng;
    const lngW = lansi.lon ?? lansi.lng;
    const lngE = ita.lon ?? ita.lng;
    // Päivämäärärajan yli kääntyvä laatikko: turvallinen tila on vanha sääntö.
    if (!(lngE > lngW) || !(lngE - lngW < 180)) return null;
    const tarveX = kehanTarve(pisteet, lat0, lngKeski, vara, 'X');
    const tarveY = kehanTarve(pisteet, lat0, lngKeski, vara, 'Y');
    if (!(tarveX > tarveY)) return null;
    let latMin = Infinity;
    let latMax = -Infinity;
    for (const piste of pisteet) {
      if (piste.lat < latMin) latMin = piste.lat;
      if (piste.lat > latMax) latMax = piste.lat;
    }
    const toive = pelaajanAsteet()?.lng ?? lngKeski;
    let lng0 = Math.min(lngE, Math.max(lngW, toive));
    let etaisyys = 0;
    let puoli = 0;
    /*
     * KOLME KIERROSTA: korkeus riippuu keskipisteestä (kaari kasvaa,
     * kun keskipiste siirtyy reunaa kohti) ja sallittu vyöhyke
     * korkeudesta. Kiinteä piste löytyy muutamalla kierroksella.
     */
    for (let i = 0; i < KORKEUSSOVITUKSEN_KIERROKSET; i += 1) {
      etaisyys = kehanTarve(pisteet, lat0, lng0, vara, 'Y');
      puoli = reunanPuoli(latMin, latMax, lat0, etaisyys);
      const alaraja = lngW + puoli;
      const ylaraja = lngE - puoli;
      lng0 = ylaraja > alaraja
        ? Math.min(ylaraja, Math.max(alaraja, toive))
        : (lngW + lngE) / 2;
    }
    if (!(etaisyys > 1)) return null;
    return {
      korkeus: Math.min(PALLO_KORKEUS_MAX, etaisyys - 1),
      lat: lat0,
      lng: lng0,
      lngW,
      lngE,
      latMin,
      latMax,
      puoli,
    };
  };

  /** Kohteen asteet ja korkeus laudan yksiköistä (ks. Kartta.kameranKohde). */
  const kameranKohde = (kohde) => {
    if (!kohde) return null;
    const nyt = pallo.pointOfView();
    let x = kohde.x;
    let y = kohde.y;
    let leveys = kohde.leveys ?? null;
    let bboxKorkeus = null;
    let sovitettu = null;
    if (kohde.bbox) {
      /*
       * LAATIKKO MAHTUU MOLEMPIIN SUUNTIIN. Korkeusehto muutetaan
       * leveydeksi kuvasuhteella (h · W/H), ja tiukempi voittaa. Tämä
       * kaava oli oikein jo ennen 5.9.2026, mutta korkeusLeveydesta
       * tulkitsi tuloksen ruudun KORKEUDEKSI (fov on pystykulma), joten
       * ehto meni käytännössä väärinpäin; nyt kamera saa kuvasuhteen ja
       * `leveys` tarkoittaa lautayksiköitä ruudun leveydellä.
       */
      const { bbox, marginaali = 0, kokonaan = false } = kohde;
      x = bbox.x + bbox.w / 2;
      y = bbox.y + bbox.h / 2;
      const vara = 1 + 2 * marginaali;
      /*
       * KAPEA RUUTU SOVITETAAN KORKEUTEEN (erä 14, PÄÄTÖKSET 17); muuten
       * korkeus pallon perspektiivistä molempiin suuntiin (erä 13, ks.
       * pallonKorkeus): laudan Mercator-yksiköt nostivat kameran noin
       * 1,35× liian kauas.
       */
      /*
       * `kokonaan`: KOKO LAATIKKO RUUTUUN, MYÖS LEVEYSSUUNNASSA
       * (KARTTAUUDISTUKSEN PAATOKSET 30, lennon rajaus).
       *
       * korkeuteenSovitus on SAAPUMISEN sääntö (PÄÄTÖKSET 17): kun maan
       * laatikko on kapealla ruudulla leveämpi kuin ruutu sallii, kuva
       * sovitetaan KORKEUTEEN ja laatikko saa vuotaa sivuille — maa
       * näkyy silloin mahdollisimman isona ja pelaajan kaupunki valitsee
       * X-keskipisteen. Lennon laatikossa sama sääntö on tuhoisa:
       * mitattu 16.9.2026 (390 × 844, Ateena → Rooma, laatikko 375 × 154
       * lautayksikköä) se antoi näkyväksi leveydeksi 85 yksikköä, eli
       * kuvaan mahtui alle neljännes matkasta. Lennolla laatikko EI ole
       * maa vaan matka, ja matkan molempien päiden on oltava ruudulla.
       */
      sovitettu = kokonaan ? null : korkeuteenSovitus(bbox, vara);
      bboxKorkeus = sovitettu ? sovitettu.korkeus : pallonKorkeus(bbox, vara);
      leveys = Math.max(bbox.w * vara, (bbox.h * vara * ruudunLeveys()) / ruudunKorkeus());
    } else if (kohde.kerroin > 0) {
      leveys = laudanLeveys / kohde.kerroin;
    }
    let lat = kohde.lat;
    let lng = kohde.lng;
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      const asteet = laudaltaAsteiksi(lauta, x, y);
      if (!asteet) return null;
      lat = asteet.lat;
      lng = asteet.lon;
    }
    // Korkeuteen sovitettaessa X-keskipiste on pelaajan kaupunki (rajattuna).
    if (sovitettu) { lat = sovitettu.lat; lng = sovitettu.lng; }
    const pyydetty = kohde.korkeus
      ?? bboxKorkeus
      ?? (leveys > 0 ? korkeus(leveys) : nyt.altitude);
    // Kamera ei mene laattojen tarkkuuden alle, ei myöskään suoraan
    // korkeutena annetulla kohteella.
    const altitude = Math.min(PALLO_KORKEUS_MAX, Math.max(korkeusMin(), pyydetty));
    /*
     * SAAPUMISASENTO (omistaja 9.9.2026, Raamattu SAAPUMISESSA KAMERA
     * ASETTUU NIIN, ETTA KAUPUNKI ON ALIMMASSA KOLMANNEKSESSA):
     * saapumisajo katsoo kaupungin POHJOISPUOLELLE ja hitusen sen
     * itäpuolelle, jolloin kaupunki itse asettuu ruudun alimpaan
     * kolmannekseen ja hieman keskeltä vasemmalle. Siirto tehdään
     * VASTA tässä, valmiista korkeudesta: näkyvä kaari riippuu
     * korkeudesta ja kotelon kuvasuhteesta, ja vain kohdistuspiste
     * liikkuu — laudan pisteet pysyvät paikoillaan.
     *
     * VAIN SAAPUMISAJOSSA. Pelaajan oma panorointi ja zoomi eivät kulje
     * täältä, joten mikään ei vedä kameraa jälkikäteen takaisin.
     */
    if (kohde.saapuminen) {
      const nakyvaYks = leveysKorkeudesta(altitude, { laudanLeveys, kuvasuhde: kuvasuhde() });
      const asento = saapumisenPallonKohta({
        lat,
        lng,
        leveysAst: asteetLeveydesta(nakyvaYks, laudanLeveys),
        paneW: ruudunLeveys(),
        paneH: ruudunKorkeus(),
      });
      if (asento) return { lat: asento.lat, lng: asento.lng, altitude };
    }
    return { lat: Math.max(-89.5, Math.min(89.5, lat)), lng, altitude };
  };

  /**
   * Ajaa kameran kohteeseen. Palauttaa lupauksen: true perillä, false jos
   * ajo keskeytyi tai ei lähtenyt.
   *
   * `sovita` (kartta.js sovitaAjonKesto, omistaja 3.9.2026: ajot
   * pehmeästi peräkkäin): kesto venyy liikkeen mukaan — +50 % per
   * zoomioktaavi ja +50 % per ruudullinen panorointi, katto 1800 ms —
   * täsmälleen samalla kaavalla kuin tasokartalla, jotta ennakkozoomi
   * ja kohdesovitus kestävät pallolla saman kuin kartalla.
   */
  const ajaKamera = (kohde, {
    kesto = PALLOKAMERAN_AJO_MS, pehmennys = siirtoajonPehmennys, sovita = false,
  } = {}) => {
    if (ui?.dead) return Promise.resolve(false);
    const maali = kameranKohde(kohde);
    if (!maali) return Promise.resolve(false);
    // Lähtö on se, missä kuva juuri nyt on — myös kesken ajon.
    const alku = ajo?.nyt ? { ...ajo.nyt } : pallo.pointOfView();
    pysaytaKameraAjo();
    heraa?.();
    const dLng = lyhinLng(alku.lng, maali.lng);
    if (ui?.reducedMotion || !(kesto > 0)) {
      pallo.pointOfView(maali, 0);
      return Promise.resolve(true);
    }
    // Ajo, joka ei liikuta mitään, on turha.
    const dLat = maali.lat - alku.lat;
    const suhde = Math.abs(Math.log(maali.altitude / alku.altitude));
    if (Math.hypot(dLat, dLng) < 0.01 && suhde < 0.005) {
      pallo.pointOfView(maali, 0);
      return Promise.resolve(true);
    }
    if (sovita) {
      // Panorointi ruudullisina: kulmamatka suhteessa lähtönäkymän
      // leveyteen asteina (sama mitta kuin kartan matka / paneW).
      const nakyvaAsteina = asteetLeveydesta(leveys(alku.altitude), laudanLeveys);
      kesto = sovitaAjonKesto(kesto, suhde, Math.hypot(dLat, dLng) / Math.max(1e-6, nakyvaAsteina));
    }
    return new Promise((valmis) => {
      const oma = { kehys: 0, valmis, nyt: { ...alku }, alkuhetki: performance.now(), kesto };
      ajo = oma;
      const askel = (hetki) => {
        if (ajo !== oma) return;
        if (ui?.dead) { pysaytaKameraAjo(); return; }
        const t = Math.min(1, (hetki - oma.alkuhetki) / kesto);
        const e = pehmennys(t);
        const nyt = {
          lat: alku.lat + dLat * e,
          lng: alku.lng + dLng * e,
          altitude: Math.exp(Math.log(alku.altitude) + (Math.log(maali.altitude) - Math.log(alku.altitude)) * e),
        };
        oma.nyt = nyt;
        pallo.pointOfView(nyt, 0);
        if (t < 1) {
          oma.kehys = requestAnimationFrame(askel);
          return;
        }
        ajo = null;
        valmis(true);
      };
      oma.kehys = requestAnimationFrame(askel);
    });
  };

  /**
   * Kerroin nykyisestä leveydestä: `lahennys` kertaa lähemmäs.
   *
   * KATTO ON ABSOLUUTTINEN, kuten tasokartalla (js/kartta.js
   * siirtoZoomiKerroin, SIIRTONAKYMAN_LAHIN_KERROIN): kerroin on
   * suhteellinen, joten ilman kattoa jokainen heitto veisi puolet
   * lähemmäs ja kolmen siirron jälkeen pallo olisi laattojen
   * tarkkuusrajassa. Siirtonäkymä ei mene PALLOLAUDAN_SIIRTOLEVEYTTÄ
   * lähemmäs — eikä koskaan ULOS pelaajan omasta lähikuvasta.
   */
  const siirtoZoomiKerroin = (lahennys = 1) => {
    const tila = kameranTila();
    const leveys = tila?.leveys ?? laudanLeveys;
    const katto = Math.max(leveys / Math.max(0.01, lahennys), PALLOLAUDAN_SIIRTOLEVEYS);
    return laudanLeveys / Math.min(leveys, katto);
  };

  /**
   * Pelaajan paikan ylle saapumisnäkymään (kesto 0 = heti). Paikka on
   * kaupunki tai reitin välipiste — sama pixelOf kuin tasokartalla.
   */
  /**
   * Laudan yksiköt, jotka laatikko vaatii ruudun leveydellä kertoimella
   * `kerroin`. Sama kaava kuin kameranKohde: korkeusehto muutetaan
   * leveydeksi kuvasuhteella, ja tiukempi voittaa.
   *
   * TÄMÄ ON KATON PORTIN MITTA (laatikkoMahtuu), EI RAJAUKSEN MITTA.
   * Rajaus lasketaan erässä 13 alkaen `pallonKorkeus`illa suoraan
   * pallon perspektiivistä; tämä jää sille yhdelle kysymykselle,
   * näkyykö maa pallolta ollenkaan.
   */
  const laatikonTarve = (bbox, kerroin) => {
    if (!(bbox?.w > 0) || !(bbox?.h > 0)) return null;
    return Math.max(bbox.w * kerroin, (bbox.h * kerroin * ruudunLeveys()) / ruudunKorkeus());
  };

  /**
   * Mahtuuko maan laatikko saapumisrajaukseen (katto
   * SAAPUMISRAJAUKSEN_MAX)? Tämä on se yksi ehto, joka erottaa
   * *"maa mahdollisimman isona"* -saapumisen entisestä
   * kaupunkinäkymästä — ja SAMA ehto ratkaisee uloszoomauksen eston
   * (ks. uloszoomausRaja), jotta kumpikin puhuu samasta katosta.
   *
   * KATTO LUETAAN LAUDAN OMISTA YKSIKÖISTÄ (ei `pallonKorkeus`esta) JA
   * KIINTEÄLLÄ VARALLA. Katto vastaa kysymykseen *"näkyykö tämä maa
   * pallolta ollenkaan"*, ja sen vastaus ei saa liikkua sen mukaan,
   * kuinka tiukaksi rajauksen marginaali säädetään: se jakaa maat
   * kahteen pysyvään joukkoon (RUS, USA, CAN, GRL, CHN saavat
   * kaupunkinäkymän — tests/maakartuutsi.test.mjs vartioi joukkoa).
   */
  const laatikkoMahtuu = (bbox) => {
    const tarve = laatikonTarve(bbox, SAAPUMISRAJAUKSEN_KATTOVARA);
    return Boolean(tarve !== null && tarve <= SAAPUMISRAJAUKSEN_MAX);
  };

  /**
   * Uloszoomauksen katto maan laatikosta: `{ max }` korkeutena
   * pallonsäteinä, tai null jos rajaa EI aseteta.
   *
   * NULL ON PÄÄTÖS EIKÄ VIRHE (Fablen vastaus suunnitelman kysymykseen
   * 1). Maat, joiden laatikko ei mahdu saapumisrajaukseen — mitattuna
   * puhelimella RUS, USA, CAN, GRL ja CHN, työpöydällä lisäksi CHL,
   * BRA, ARG ja AUS — saapuvat entiseen kaupunkinäkymään, jolloin
   * niiden "laatikko × 1,15" olisi koko maailmankuva ja kamera
   * LUKKIUTUISI siihen: pelaaja ei näkisi kaupunkia. Lista ei ole
   * koodissa, koska se riippuu kuvasuhteesta — KATTO kertoo sen, ja
   * katto luetaan tässä samasta funktiosta kuin saapumisessa.
   */
  const uloszoomausRaja = (bbox, kerroin = ULOSZOOMAUKSEN_KERROIN) => {
    if (!laatikkoMahtuu(bbox)) return null;
    // SAMA KAAVA KUIN SAAPUMISELLA (erä 13): katto lasketaan
    // `pallonKorkeus`illa, jotta uloin sallittu näkymä ja
    // saapumisnäkymä ovat kertoimen 1,02 kohdalla sama näkymä.
    // Korkeuteen sovitetulla ruudulla katto on sama korkeus kuin saapumisella.
    const tarve = korkeuteenSovitus(bbox, kerroin)?.korkeus ?? pallonKorkeus(bbox, kerroin);
    if (!(tarve > 0)) return null;
    const max = Math.min(PALLO_KORKEUS_MAX, Math.max(korkeusMin(), tarve));
    // Katto ei saa mennä lattian alle: pikkuvaltiossa (Singapore)
    // laatikon tarve on jo lähempänä kuin lähin sallittu korkeus.
    if (!(max > korkeusMin())) return null;
    return { max };
  };

  /**
   * PANOROINNIN SALLITTU ALA ASTEINA maan laatikosta (erä 9).
   *
   * Laatikko on LAUDAN yksiköissä, ja raja on asteissa, koska
   * panorointi kirjoittaa `pointOfView`in lat/lng-kentät
   * (js/pallo.js). Muunnos tehdään laatikon KAHDESTA NURKASTA samalla
   * `laudaltaAsteiksi`-kaavalla, jota koko lauta käyttää — ei omaa
   * projektiota.
   *
   * PITUUSASTEEN RAJA JÄTETÄÄN POIS, jos laatikko kiertää pallon
   * (span ≥ 180°) tai nurkat kääntyvät päivämäärärajan yli. Silloin
   * "min ja max" eivät ole yksikäsitteisiä, ja väärin päin oleva raja
   * nykäisisi kameran maailman toiselle puolelle — TURVALLINEN TILA on
   * jättää se suunta vapaaksi (leveysaste rajaa silti).
   */
  const panoraja = (bbox, kerroin = PANOROINNIN_KERROIN) => {
    if (!(bbox?.w > 0) || !(bbox?.h > 0)) return null;
    const kx = bbox.x + bbox.w / 2;
    const ky = bbox.y + bbox.h / 2;
    const w = (bbox.w * kerroin) / 2;
    const h = (bbox.h * kerroin) / 2;
    const a = laudaltaAsteiksi(lauta, kx - w, ky - h);
    const b = laudaltaAsteiksi(lauta, kx + w, ky + h);
    if (!a || !b) return null;
    const latMin = Math.min(a.lat, b.lat);
    const latMax = Math.max(a.lat, b.lat);
    if (!Number.isFinite(latMin) || !Number.isFinite(latMax)) return null;
    const lngMin = Math.min(a.lon, b.lon);
    const lngMax = Math.max(a.lon, b.lon);
    const lngOk = Number.isFinite(lngMin) && Number.isFinite(lngMax)
      && lngMax - lngMin < 180;
    /*
     * AKSELIKOHTAINEN X-RAJA KORKEUTEEN SOVITETULLA RUUDULLA (erä 14).
     * Laatikko on silloin ruutua leveämpi, joten kertoimen 1,3 vyöhyke
     * päästäisi maan reunan ruudun sisään ja sen taakse näkyisi
     * naapurimaita. Raja on se, mikä se luonnostaan on: keskipiste saa
     * liikkua vain niin lähelle reunaa, että reuna pysyy ruudun
     * laidassa (`reunanPuoli`). Y jää kertoimen varaan kuten ennen —
     * pystysuunnassa laatikko jo täyttää ruudun.
     *
     * LUKU RIIPPUU ZOOMISTA: lähempänä vyöhyke on leveämpi, joten maan
     * reunalle pääsee myös sisäzoomilla. Siksi raja merkitään
     * ELÄVÄKSI — js/pallolauta/lauta.js ei muista sitä laatikon mukana.
     */
    const sovitus = korkeuteenSovitus(bbox, ULOSZOOMAUKSEN_KERROIN);
    if (sovitus) {
      const nyt = pallo.pointOfView()?.altitude;
      const puoli = reunanPuoli(
        sovitus.latMin, sovitus.latMax, sovitus.lat,
        1 + (nyt > 0 ? Math.min(nyt, sovitus.korkeus) : sovitus.korkeus),
      );
      const alaraja = sovitus.lngW + puoli;
      const ylaraja = sovitus.lngE - puoli;
      const keskiLng = (sovitus.lngW + sovitus.lngE) / 2;
      return {
        latMin,
        latMax,
        lngMin: ylaraja > alaraja ? alaraja : keskiLng,
        lngMax: ylaraja > alaraja ? ylaraja : keskiLng,
        elava: true,
      };
    }
    return {
      latMin,
      latMax,
      lngMin: lngOk ? lngMin : null,
      lngMax: lngOk ? lngMax : null,
    };
  };

  /**
   * Kameran keskipiste sallittuun alaan. Palauttaa aina `{ lat, lng,
   * latRajattu, lngRajattu }`; rajattu-liput kertovat kutsujalle, että
   * liuku on pysäytettävä siinä suunnassa (js/pallo.js).
   *
   * PITUUSASTE TUODAAN ENSIN LÄHIMPÄÄN KIERROKSEEN. Veto ei normalisoi
   * lng:tä, joten se voi olla 362° tai −358°; ilman tätä raja
   * nykäisisi kameran täyden kierroksen väärään suuntaan.
   */
  const rajaaPanorointi = (raja, lat, lng) => {
    if (!raja) return { lat, lng, latRajattu: false, lngRajattu: false };
    const uusiLat = Math.min(raja.latMax, Math.max(raja.latMin, lat));
    let uusiLng = lng;
    if (Number.isFinite(raja.lngMin) && Number.isFinite(raja.lngMax)) {
      const keski = (raja.lngMin + raja.lngMax) / 2;
      uusiLng = lng - Math.round((lng - keski) / 360) * 360;
      uusiLng = Math.min(raja.lngMax, Math.max(raja.lngMin, uusiLng));
    }
    return {
      lat: uusiLat,
      lng: uusiLng,
      latRajattu: Math.abs(uusiLat - lat) > 1e-9,
      lngRajattu: Math.abs(uusiLng - lng) > 1e-9,
    };
  };

  const kotiin = ({ kesto = 0, bbox = null } = {}) => {
    const { game } = ui ?? {};
    const pos = game?.player?.pos;
    if (!pos || !game.board) return Promise.resolve(false);
    /*
     * MAAN LAATIKKO VOITTAA KIINTEÄN SAAPUMISLEVEYDEN (omistaja
     * 11.9.2026 ilta: maa mahdollisimman isona). Laatikko tulee
     * kutsujalta (js/pallolauta/lauta.js saapumisrajaus), koska se
     * asuu maapolygoniaineistossa eikä kamera lataa aineistoja.
     * Ilman laatikkoa — tuntematon maa, aineisto ei latautunut —
     * jäljelle jää entinen kaupunkinäkymä, eli mikään ei mene rikki.
     */
    if (laatikkoMahtuu(bbox)) {
      return ajaKamera({ bbox, marginaali: SAAPUMISRAJAUKSEN_MARGINAALI }, { kesto });
    }
    const kohta = pixelOf(game.board, pos);
    if (!Number.isFinite(kohta?.x)) return Promise.resolve(false);
    return ajaKamera(
      // `saapuminen`: kaupunki alimpaan kolmannekseen (kameranKohde).
      { x: kohta.x, y: kohta.y, leveys: PALLOLAUDAN_SAAPUMISLEVEYS, saapuminen: true },
      { kesto },
    );
  };

  return {
    ajaKamera,
    kameranTila,
    nakyvaAlue,
    /** Panoroinnin sallittu ala asteina (erä 9; null = ei rajaa). */
    panoraja,
    /** Keskipiste sallittuun alaan (erä 9). */
    rajaaPanorointi,
    /** Lähin sallittu korkeus juuri nyt (OrbitControlsin minDistance). */
    korkeusMin,
    /** Lähin sallittu näkyvä leveys lautayksikköinä (savukkeet, vartijat). */
    lahinLeveys: () => leveys(korkeusMin()),
    /**
     * Laattojen venytys lähimmässä näkymässä (savukkeet ja mittarit;
     * ks. laattojenVenytys). Terävyys tulee vektoriviivoilta, joten
     * venytys saa ylittää PALLON_SALLITTU_VENYTYKSEN.
     *   `kerros` = laattakerroksen pyramidin syvin taso (se, mitä
     *              pallolle nyt piirretään),
     *   `pohja`  = kirjaston oman Mercator-sarjan syvin taso
     *              (perääntymistie ?laattakerros=0).
     */
    venytys: () => {
      const leveysYks = leveys(korkeusMin());
      return {
        leveys: leveysYks,
        kerros: laattojenVenytys({ leveysPx: ruudunLeveys(), dpr, laudanLeveys, leveysYks }),
        pohja: laattojenVenytys({
          leveysPx: ruudunLeveys(), dpr, laudanLeveys, leveysYks, pxAste: laatanTarkkuus(laattataso),
        }),
      };
    },
    kameraAjossa: () => Boolean(ajo),
    pysaytaKameraAjo,
    siirtoZoomiKerroin,
    kameranKohde,
    kotiin,
    /** Mahtuuko maan laatikko saapumisrajaukseen (ks. laatikkoMahtuu)? */
    laatikkoMahtuu,
    /** Uloszoomauksen katto maan laatikosta tai null (ks. uloszoomausRaja). */
    uloszoomausRaja,
    /**
     * Sovitetaanko tämän laatikon saapumisnäkymä KORKEUTEEN (erä 14,
     * PÄÄTÖKSET 17)? Sama ehto kuin `korkeuteenSovitus`illa — ruudun
     * kuvasuhde on kapeampi kuin laatikon kuvasuhde pallolla — vain
     * luettavaksi ulos. Maapaneeli valitsee sillä ankkurinsa (erä 16,
     * PÄÄTÖKSET 18); kameran oma logiikka ei muutu.
     */
    korkeuteenSovitettu: (bbox, vara = ULOSZOOMAUKSEN_KERROIN) => (
      Boolean(bbox && korkeuteenSovitus(bbox, vara))
    ),
    /**
     * Kesken oleva ajo mittausta varten (savuke-siirtokoreografia
     * `--lauta pallo`): sama muoto kuin Kartta.kameraAjo — nykyinen
     * kehys laudan yksiköissä, kesto ja alkuhetki. Null, kun ajoa ei ole.
     */
    get kameraAjo() {
      if (!ajo?.nyt) return null;
      const kohta = projisoiLaudalle(lauta, ajo.nyt.lng, ajo.nyt.lat);
      return { nyt: { x: kohta?.x, y: kohta?.y }, kesto: ajo.kesto, alkuhetki: ajo.alkuhetki };
    },
  };
}
