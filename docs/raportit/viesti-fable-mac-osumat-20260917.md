# Viesti Fablelle: nimikyltin kylki ja nostolapun osuma Macilla (17.9.2026)

Opus-agentti, haara `claude/bold-ride-vow4ki-mac-osumat` (origin/mainin
päältä). Aikakatto 45 min täyttyi; kaikki luvut alla ovat mitattuja.
Ympäristö: macOS, Chrome for Testing (Playwright 1.62.1), dpr 2.

## (a) Nimikyltti vaihtoi kylkeä vedon yli — JUURISYY: RUUDUN REUNA, EI FONTTI

Mittaus tehtiin instrumentoidulla kopiolla savukkeesta: jokainen ladonta
vedon aikana kirjattiin (lukko olemassa, lukon laatikko, `mahtuu`, tuore
sijoitus). Loki, puhelin 390 × 844, Pariisi, veto −100 px:

- Pariisin ruutupiste: 172 → 139 → 92 → 58 → 37 → 25 → 21 px (kotelo 374
  px leveä). **Sormen 100 px:n veto siirsi palloa 151 px** — globe.gl:n
  oma vaimennus jatkaa liikettä sormen noston jälkeen, Macilla selvästi
  pidempään kuin kontissa.
- Kun piste oli 58 px:n kohdalla, lukon laatikko oli `x0 = −21,4` eli
  ruudun ulkopuolella → `mahtuu: false` → **lukko purkautui ja ladonta
  valitsi uuden kyljen** (`end` → `middle` → `start`). Tämä on pelin
  TARKOITETTU käytös (js/pallolauta/nimet.js RUUDUN REUNA PURKAA LUKON:
  sivuttain vaihtuva kyltti on pienempi paha kuin katoava).

Vastakokeet samasta lokista: `kerroin` oli joka ladonnalla sama (1 → 1),
eli porrastus piti eikä lukko purkautunut mittakaavasta; kirjasin oli
oikea ja valmis (`document.fonts: loaded`, computed `Iowan Old Style`,
kyltin leveys 61,5 px). Kirjasinero Linuxiin on olemassa (canvas 20 px
"Pariisi": Iowan 55,2 px, Georgia 56,7 px, geneerinen serif 51,1 px),
mutta se ei purkanut lukkoa kertaakaan. **Pelikoodiin ei siis koskettu
kohdassa (a)** — vika oli savukkeen oletuksessa "veto ei vie kaupunkia
laitaan", joka ei pidä Macilla.

Korjaus savukkeeseen (tools/savukkeet/savuke-nimikyltti.mjs):

1. Vedot puolitettiin (−100/200/200/200 → −40/80/80/80), koska mitta on
   pallon liike eikä sormen; liike kattaa yhä useamman ladonnan.
2. Vartiot 1–2 parittavat vain mittaukset, joissa kaupunki on SYVÄLLÄ
   ruudulla (`syvalla`, sama ehto jolla vartio 3 jo mittaa pudotukset).
   Laidalla vaihtunut kylki on pelin oikeaa käytöstä. Väite itse ei
   löystynyt: raja on yhä ≤ 1 px.

Luvut: **1./2. puhelin/pariisi 102,40 / 4,20 px → 0,00 / 0,00 px**
(sarja `-40.0/62.7` viisi kertaa peräkkäin); työpöytä samoin vakaa
(`-45.2/71.1` ja `72.5/69.9` viisi kertaa).

### JÄLKI, JOKA JÄI PUNAISEKSI — uusi löydös, ei korjattu (aika loppui)

Pienemmillä vedoilla savukkeen loppupää päätyy eri kameraan, ja siellä
paljastui kaksi UUTTA punaista: `7a/7b tyopoyta/venetsia` (kylki
`start/end`, suunta 174,1°) ja `7a/7b tyopoyta/firenze`
(`start/start/end`, 173,5°) eli KYLKI VAIHTUU ZOOMIN YLI näillä kahdella
kaupungilla. Se on sama perhe kuin (a) mutta zoomissa (Raamattu, ZOOMI
EI SAA VAIHTAA KYLTIN PUOLTA) — ilmeisesti panoroinnista periytynyt
lukko purkautuu jollain zoomtasolla. **Suositus: oma erä.**
Savukkeen kokonaisluku: **58/63 → 56/63** (kaksi entistä punaista
vihreäksi, neljä uutta punaista riviä samasta uudesta löydöksestä).
Muut punaiset (4. kyltti/paneeli-suhde, 9b limityspari) olivat punaisia
jo ennen erää.

## (b) Napautus nimilapun tekstiin avasi naapurin noston — JUURISYY: YHTEINEN KEHYS

Mitattu savukkeen omasta lokista (Bukarest, puhelin): napautus
Transfăgărășanin OMAAN musteeseen avasi Strousbergin noston, ja
napautus Nadia Comănecin lapun ulkopäähän avasi Transfăgărășanin.
Kumpikin oli TASAPELI: `musteenVoittaja` mittaa etäisyyden laatikkoon,
ja laatikko (`nostonLaatikko`) on IKONIN JA NIMIÖN YHTEINEN KEHYS. Kun
nimiö on kyljessä, kehykseen jää tyhjiä kulmia, joissa ei ole yhtään
mustetta; naapurin lappu osuu juuri sinne, jolloin molempien etäisyys on
0 ja voittajan ratkaisi keskipistemitta. Sormen poikkeamanapautukset
(8 px musteen ulkopuolelta) menivät jo ennestään oikein — sama todiste:
kyse ei ollut varan koosta vaan tasapelin ratkaisusta.

Korjaus peliin:

- `js/pallolauta/nostot.js`: uusi `nostonOsat(p, d, …)` — sama kaava kuin
  `nostonLaatikko`, mutta palauttaa [ikonin ruutu, nimiön kaista]
  ILMAN yhteistä kehystä. Rekisteröidään elävälle ja poltetulle nostolle
  (`r.osat`) osumatestiä varten.
- `js/pallolauta/lauta.js`: `musteenVoittaja` saa uuden tasapelimitan
  `oma` = etäisyys ehdokkaan PIIRRETTYYN musteeseen. Järjestys on nyt
  kehysmitta → oma muste → keskipiste. Kehysmitta on yhä ensisijainen,
  joten osumapinta ei kutistu missään: sääntö muuttuu vain siellä, missä
  kaksi kehystä oli ennen tasan. Tämä on Raamatun PAATOKSET 31
  TARKENNUS 2 kohta 4 ("nosto vie napautuksen vain jos sormi on sen
  OMALLA musteella") kirjaimellisesti.

Luvut: **vartio 6: napautuksia 3, oikein 1 → oikein 2.** Nadia
Comăneci -napautus korjautui (avautui `transfagarasan` → `comaneci`).
Transfăgărășanin napautus avaa yhä Strousbergin: siinä tasapeli ei
ratkea osamitalla, eli Strousbergin POLTETTU muste (ikoni tai nimiö) on
oikeasti sormen alla. Se on ladonnan/sovittelun limitys eikä
osumasäännön valinta — ja sama ilmiö näkyy savukkeen vartiossa 2
(`kaupunkinimi leikkaa liikkumatonta mustetta, limityksiä 2`, punainen
myös ennen erää). **Suositus: seuraava erä sovitteluun.**
Savukkeen kokonaisluku: 6/8 ennen ja jälkeen (vartio 6 yhä punainen,
mutta oikeita napautuksia yksi enemmän).

### Vastakoe

Kohdan (b) vastakoe on ENNEN-ajo samalla koneella ja samalla savukkeella
ilman korjausta (erillistä peruutusajoa ei ehditty): ilman korjausta
Nadia Comăneci -napautus avasi naapurin, `vanha sääntö: ei mitään →
avautui transfagarasan`; korjauksen kanssa sama rivi on `→ avautui
comaneci`. Muut rivit eivät muuttuneet, eli korjaus puree täsmälleen
tasapelitilanteeseen eikä muuhun. Kohdan (a) vastakoe on lokissa itsessään: mittaukset, joissa
`syvalla` on epätosi, ovat täsmälleen ne, joissa lukko purkautui
`mahtuu: false` -ehdosta.

## Testit ja julkaisu

`node --test tests/*.test.mjs`: **# pass 3572, # fail 0** (3585 testiä).

**VAATII VERSIONOSTON** — `js/pallolauta/lauta.js` ja
`js/pallolauta/nostot.js` muuttuivat. `tools/uusi-versio.mjs` on
jätetty ajamatta (Fable tekee julkaisun).
