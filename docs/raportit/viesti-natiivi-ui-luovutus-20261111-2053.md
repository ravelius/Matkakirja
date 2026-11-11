# Natiivi-UI: luovutus 11.11.2026 klo 20.53 (kontekstivahti 26 %; korvaa -2025:n, haara natiivi-ui/luovutus-20261111-2025 09370c0fc)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f, Äänittäjä local_726ba209-ff08-43be-a35d-5a60f96f60e1, SK local_b9ca71c7-3458-4e1d-aa21-f6c97e27c708.
Natiivikoodi: worktree /Users/Shared/Claude/wt/proto-nui-pallo (remote natiivi-backup; haara natiivi-ui/intro-nimet) ja
/Users/Shared/Claude/wt/nui-pp-v10 (haara natiivi-ui/petit-palais-v10). Tarkistus: `sh Peli-testit/unity-tarkistus.sh </dev/null`;
Linssit `sh Linssit-testit/kaanna.sh </dev/null` (2289/2289); Peli-testit `sh Peli-testit/kaanna.sh </dev/null` (912/912). Mac-ajot JU:n kautta;
skriptit /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-*.txt, lokit /Users/Shared/Claude/proto-3d/lokit/nui-*. ÄLÄ KOSKAAN pkill -f.

## A: SAAPUMISINTRO + PARIISIN UUDET TEKSTIT (omistaja 19.58 A ja 20.31; suunnitelmat 20261111-omistaja-1958-saapuminen-ja-tekstit.md,
## 20261111-pariisin-tekstit-lopulliset.md) — haara natiivi-ui/intro-nimet, UUSIN 84d3e39a5
- ed3045d1e + 25ab7e0ff + 7377430b3: nimi · vuosi -rivit, kuvat lyhyemmin, isoisän kuvat pois introsta, sääntö 9, erän 1 rivit (ks. -2025).
- baf16f90d + ecf7c28a6: Matkakirjakortti.AsetaSivukuva: isoisän YKSI kuva tekstin oikealla puolella luennan alkaessa (luentakuvat[0]); ei alaosan
  pikkukuviin; lapussa piilossa; napautus = Tuileries/suurennos. Vain Pariisi (Saapumisesitys.SivukuvaKaupungeissa; `ui saapumisintro sivukuva
  pariisi|kaikki|pois`). Toimii myös Pariisin aloituslento-haarassa.
- ee723bf13 + 34b828931: Pariisin pulun kommentin ääni = https://media.matkakirja.app/aanet/kaupunki-intro-v3/pulu-pariisi-3.mp3 (otto 3, KK hyväksyi),
  tiiviste b67b8821 = SK:n teksti 7a9a12f26 sanatarkasti (tarkistettu). KommentinAani hyväksyy täyden osoitteen.
- 84d3e39a5 LÖYDÖS intro-nimet-1:stä: isoisän kortti meni kaupunkinäkymässä M-napiksi koko luennan ajaksi (a6/a7) → nyt Saapumisesitys.Alkoi avaa
  kortin (kortti.Avaa) kun IsoisanKuvatIntrossa = false; lokirivi "isoisän teksti auki luennan alkaessa".
- AJOT: intro-nimet-1 (ed3045d1e) KATSOTTU: nimet luettavia, rajaukset lokit/nui-intro-nimet-1-ed3045d1e/rajaus-a1…a5.png → KK:lle lähetetty 20.5x
  (+ löydös ja korjaus). Lontoo-osa b jäi lennolle (ajastus) → uusittava. sk-sivukuva-1 JU:n jonossa SHA:lla 84d3e39a5 → lokit/nui-sivukuva-1-84d3e39a5
  (JU:lle sanottu; jos ajoi ecf7c28a6:lla, kortti on M → aja uudelleen). SEURAAVA: katso a1–a5 (kortti auki, kuva tekstin vieressä, a4 lappu, a5 avattu)
  → KK + PT kopio. KK:n sanan jälkeen PT:lle "84d3e39a5 (intro-nimet) JUNAAN".
- ISOISÄN ÄÄNI on dataa: SK:n pitää asettaa fokusvirta-pariisi.js matkakirja.aanite + luennat-kokoelman url =
  https://media.matkakirja.app/aanet/kaupunki-intro-v3/isoisa-pariisi.mp3 ja poistaa vanhat reaktiot (PT:lle sanottu 20.4x, välittää SK:lle).
- Odottaa datana: Codexin uusi isoisän kuva (luentakuvat[0]) ja SK:n pulun kuva (p1-viittaukset esittelypaikat.mjs/json, SK lähettää SHA:n).

## PETIT PALAIS — haara natiivi-ui/petit-palais-v10 = c650f3ca6 (= 50ea00f74 + ManifestiOletus v10)
- c650f3ca6: Valmisluennat v9 → v10 (v9 + 3 PP-palaa, 9 270), Kultaiset/valmisluennat-v10, testit 912/912. Korvaa 50ea00f74:n.
- PR 6579 (juttu) yhdistetty mainiin 5f2157b2c. Sisältövienti levylle: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/vienti-pp4 (main 5f2157b2c).
- -3 (50ea00f74) EPÄONNISTUI: "mallilla Petit Palais ei kohdenostoa" — juuren vaihdon jälkeen kohdenostot eivät laskeneet uudelleen (ei riviä
  "kohdenostot: pariisi, merkkejä 26"; -2:ssa laski). Ei näytetty KK:lle.
- sk-petit-palais-4 (ÄÄNI PÄÄLLÄ, juuri heti alussa, tallenne) JU:n jonossa → lokit/nui-petit-palais-4-c650f3ca6. SEURAAVA: tarkista "merkkejä 26",
  "Petit Palais esitellään", "ui lukija: aloita pala"; kuvat 0-kyltti, 1-palkki, 2–5 kierto, 6-lähin + tallenne → KK. Jos taas "ei kohdenostoa":
  selvitä Kohdenostot.Ruudulla/Vaihda (Kohdekartat.AsetaKehittajanJuuri nollaa kartat, Valitse palauttaa uuden olion → Vaihda pitäisi ajaa).

## B: NAPAUTUS YHDELLE ETÄISYYDELLE — LINKISSÄ 224.82 = 53171fed0 (JU 20.39)
- Junan ehtoajo sk-yksi-etaisyys-2 → lokit/juna-yksi-etaisyys-2-53171fed0 (JU tekee arkki-6s.png). SEURAAVA: katso arkki (Orsay 0,27, Louvre 0,38) → KK + PT;
  jos Orsay liian pieni: sen OMA ensimmäinen etäisyys, EI kasvun palautus (KK 20.26). Sitten työlistarivi valmiiksi.

## TYÖKALU 3 (vakioajo) ja D (aarrekysymys) — ODOTTAA KK:N VASTAUSTA
- Tehtävänannot: suunnitelmat/20261111-kolme-tyokalua-tehtavananto.md "TYÖKALU 3" + tarkennukset 21.1x; suunnitelmat/20261111-aarrekysymys-saapuessa.md.
- JU:n sopimus: /Users/Shared/Claude/julkaisija-tyokalut/vakioajo/sk-vakioajo.txt otsake (vakio-kohteet, vakio-yleis, vakio-kohde i, vakio-kohde-kulma,
  vakio-kohde-sulje, vakiokuva i; valmis-rivit vasta kun kamera asettunut).
- "Ennen aloitusta" -viesti KK:lle lähetetty 20.5x: kohdeluettelo = Nahtavyysalue.Kylttikohteet (ehdotus), Lontoon esittely riski, kaukaa-rajaus
  NS:n taulua odotellessa, vakiokuva JSON levyltä, komennot "ui vakio …"; D: MatkaPerilla-lykkäys PeliOhjaimessa + testikytkin kaikille Mac-skenaarioille.
- JÄRJESTYS (PT): Pariisin loppulista ja A edellä; D A:n ja ohjaussauvojen jälkeen. Ohjaussauvat (KK 19.22): ensin mitat + ehdotus KK:lle.

## LISÄYS 21.0x (ennen nollausta) — LUE TÄMÄ ENSIN
- JUNAA VARTEN pulusta erillinen SHA (PT: pulun ääni kuuluu vasta Pariisin tekstiversioon SK:n datan kanssa): 3d513772b
  (natiivi-ui/intro-nimet-kortti = ecf7c28a6 sivukuva + isoisän kortti auki luennalla; EI pulun ääntä). JU ajaa sivukuva-1:n tällä →
  lokit/nui-sivukuva-1-3d513772b (ecf7c28a6-ajo L2:lla 20.49 näyttää kortin M:nä = vika ennen korjausta). Katso 3d513772b-ajo → KK.
  natiivi-ui/intro-nimet (84d3e39a5) = sama + pulun ääni (Pariisin tekstiversioon).
- PETIT PALAIS: c650f3ca6 menee junaan 50ea00f74:n tilalle (PT); petit-palais-4 JU:n jonossa.
- B: yksi-etaisyys-2 224.82 (53171fed0) VALMIS 20.49 12/12, PUUTE 0: /Users/Shared/Claude/proto-3d/lokit/juna-yksi-etaisyys-2-53171fed0/arkki-6s.png
  → tee KK-arkki (Orsay, Louvre koko) → KK + PT. EI vielä katsottu.
- UUSI TYÖ (PT 21.0x): PULUN PARIISIN KUVA PYÖREÄLLÄ RAJAUKSELLA. SK a4be3cdd9 (koti/Matkakirja-sisaltokirjuri): pollo.kuvat = Commons
  "Ballon Generali and the Eiffel Tower.jpg" (Aero4, CC BY-SA 4.0), p1 pois, esittelypaikat.mjs PARIISIN_LENTO + data/esittelypaikat.json.
  Uusi kenttä `rajaus: { keskipiste: [0.742, 0.504], halkaisija: 0.52 }` (keskipiste leveyden/korkeuden suhteina, halkaisija leveyden suhteena):
  natiivi näyttää pyöreän kehyksen tästä kohdasta (pallo ja joki, Eiffel pois) MUOKKAAMATTA kuvaa. Toteuta: VirtaKuva/Fokusvirrat lukee rajauksen,
  pulun nousukuva + kartan pyöreä pieni kuva (SaapumisKuvat/"pieni kuva kartalle") käyttävät sitä (backgroundPosition/-Size UITK:ssa).
  Lopuksi SHA + kuva KK:lle. Sisältövienti levylle SK:n haarasta (vie-sisalto --ulos) Mac-ajoa varten.
- 21.0x JU: sivukuva-1 ajetaan 84d3e39a5:llä → lokit/nui-sivukuva-1-84d3e39a5 (kuvissa sama kuin 3d513772b; ero vain pulun ääni). Katso se; junaan silti 3d513772b.
- 21.1x KORJAUS: sivukuva-1 ecf7c28a6 (lokit/nui-sivukuva-1-ecf7c28a6) katsottu: sivukuvaa EI tullut (Sivukuvallinen vertasi "Pariisi", tunnus on
  "pariisi"; a5-avattu: kortti + kaksi pikkukuvaa alhaalla). Korjattu: JUNAN SHA nyt 1bde772da (natiivi-ui/intro-nimet-kortti), pulun haara
  d9af44f0f (natiivi-ui/intro-nimet). JU:lle: ajo 1bde772da → lokit/nui-sivukuva-1-1bde772da (korvaa 84d3e39a5- ja 3d513772b-ajot). Katso → KK.

## KK:N PÄÄTÖKSET 21.1x (sanatarkasti tiivistettynä; KK local_d5f31591…)
A (ennen junaa, KK:n sanalla): (1) PARIISI-kirjaimet eivät saa kulkea kuvan nimirivin yli: 1. kuvan nimi näkyviin vasta kun kirjaimet ohi, TAI
rivit eri korkeudelle. (2) Nimirivin kontrasti vaalealla kuvalla (Riemukaari) vahvemmaksi reunalla ja varjolla, EI tummaa kaistaa
(SaapumisKuvat.LisaaIntroNimi + Pulu.uss). Sitten uusi ajo; KK katsoo rajaukset a1–a5, tallenteen ja sivukuva-ajon kuvat yhdessä; junaan vasta KK:n sanalla.
Korjaukset junan haaraan natiivi-ui/intro-nimet-kortti (1bde772da) ja sama pulun haaraan natiivi-ui/intro-nimet (d9af44f0f).
TYÖKALU 3 HYVÄKSYTTY: kohdeluettelo = Nahtavyysalue.Kylttikohteet (Pariisi 14), ei nostoja. Lontoo: ensimmäinen vakioajo näyttää viat;
korjaukset = Lontoon käsityö, eivät estä työkalua (valmis = Pariisin arkki + Lontoon arkki PUUTE-riveineen). Kaukokuvan rajaus kohteista
kunnes kaupunkitaulu; arkin otsikkoon rajauksen lähde. Komennot "ui vakio …" (JU:lle tieto etuliitteestä), vakiokuvat JSON levyltä.
D: (a) MatkaPerilla lykätään YHDESSÄ kohdassa PeliOhjaimessa, ei ehtoja kuuntelijoihin; NS katsoo esilatauksen; oikein-merkillä nykyiset
saapumistestit läpi muuttumattomina. (b) Testikytkin vain kehityskäännöksessä, ajajan oletus "automaatti" (vastaa heti oikein) yhdessä
paikassa, EI skriptien muokkausta; pelissä kysymys aina päällä. (c) Kysymys: nappulan alla, muuten kaupungin kohdalla, muuten alhaalla keskellä.
Rasti: ei noppaa, vapaa kartta, Liiku-napista itse (omistaja 20.47).
JÄRJESTYS: A:n kaksi korjausta → pulun pyöreä rajaus → B-arkki → työkalu 3 → ohjaussauvat → D (PT:n järjestys: loppulista ja A edellä).
- SK 21.2x: ERÄN 2 introrivit ffd9b02db (koti/Matkakirja-sisaltokirjuri) docs/raportit/saapumisintro-rivit-era2-20261111.json: 103 kuvaa
  (kaupunki/nro/kuva/rivi/tila); IntroNimet-taulukkoon VAIN tila=valmis (98); 5 odottaa-katselua (Lissabon #5/#8/#9, Rooma #9/#11) ei peliin.
  Tee kuten erä 1 (7377430b3). Lisäksi SK 7d4896367: isoisän ääni datassa (aanite = kaupunki-intro-v3/isoisa-pariisi.mp3, reaktiot tyhjä).
