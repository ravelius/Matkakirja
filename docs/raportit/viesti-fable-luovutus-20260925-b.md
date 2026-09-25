# Fablen luovutus 25.9.2026 klo 10.4x (tili B, sessio 25.9. klo 00.4x → 10.4x)

Edellinen: viesti-fable-luovutus-20260925.md. Kaikki päätökset lokissa docs/raamattu-loki/paatokset-2026-09.md klo 00.45 → 10.4x
(~110 otsikkoa). Omistaja heräsi klo 03.2x ja on ollut hereillä; ei yötilaa enää.

## Raamattuun tänä sessiona (kaikki sitovia, mainissa #3137/#3141 tai Fablen haarassa → Julkaisijan synkkaus)
- TYÖNJOHTAJAN HARKINTA (04.3x): Fable kysyy ensin itseltään tilanteen mukaan (kuorma, vuorokaudenaika, omistaja), vasta sitten omistajalta.
- JUMI → FABLE (04.4x, korvaa JUMI → KORTTI): sessiot eivät tee kortteja omistajalle eivätkä odota häntä; yksi viesti Fablelle
  (tilanne, vaihtoehdot, suositus) ja muu työ jatkuu; vain Fable tekee kortteja omassa sessiossaan + push. Työpöytäsovelluksen
  lupaikkunasta ilmoitus Fablelle. Julkaisijan luokitin hyväksyi säännön vasta Raamatun tiedostosta (main), ei vertaisviestistä.
- JUNAT TAPAHTUMAOHJATUIKSI (04.1x): testikäännös heti uudesta juna-commitista (käännösvahti launchd fi.matkakirja.juna-vahti,
  10 min niputus; proto-kaanna.sh sammuttaa asennuksen jälkeen simut, jotka se käynnisti); sisältöjuna kun ≥ 4 vihreää sisältö-PR:ää
  tai vanhin yli 4 h; TestFlight BUILD-sanasta.
- HUOLTOKOMENNOT ILMAN OMISTAJAA (08.4x): sudo NOPASSWD koodaus-käyttäjälle neljälle komennolle (killall coreaudiod,
  killall -9 CoreSimulatorService, killall mDNSResponder, purge; /etc/sudoers.d/matkakirja-huolto); sallinnat settings.json:ssa
  mainissa (#3142, omistaja mergesi itse). Postivahti ajaa coreaudiod-korjauksen (> 200 % yli 2 min).
- UUSIA LINSSEJÄ EI ALOITETA ENNEN PARITEETTIA (09.3x): ei toteutusta eikä uutta suunnittelua; valmis = liikkumislista 0 ERI,
  pariteettiajo 0 yli 16 px, omistajan build-kokeilu ilman uusia löydöksiä. Linssiseppä olemassa olevien linssien pariteettiin.
- ☰-VALIKKO KAIKILLE LAITTEILLE (05.0x): iPad sama yhdistetty valikko; Retkikunta napin taakse; Kokeet pois pelaajalta, Maailma
  Kartta-ryhmään. LINSSIEN YLÄPALKKI iPHONELLA (05.4x): logo ja ☰/sulje Dynamic Islandin korkeudella, kaarevat kulmat huomioon,
  vuosiluku vasemmalle, alkuzoomi verhon takana, uudelleenaloitus nollaa kertojan. MATKAKIRJA-LOGO matkalaukun oikeaan yläkulmaan
  iPhonella. YLÄPALKKI: pystyssä aina näkyvissä (peruutus), väkäsnappi vain vaakamuodossa, pilleri Dynamic Islandin korkeus,
  paikkakupla pienennettynä vain kaupungin nimi, KORKEUS iPhone 62 → 70 pt, iPad 60 → 64 pt (hyväksytty poikkeama).
- PERUSKARTAN RESEPTI hyväksytty kuvaparista (03.4x); löydös 46 rantaviiva = 0,25 (vaihtoehto 3).

## Build-tila
Build 12 = 1.0.12 (proto b79f036, CFBundleVersion 202609250125, ajo 36081944921) TestFlightissa klo 04.3x; savukierros iPhone + iPad PASS.
Build 13 kokoontuu juna/b13:een (viimeisin c12ad3ae): liikkuminen (Pelikoodari b089ece, videopari), kaupunkinimet webin kehällä,
kohdesovitus 56, radio kokonaan + yövalot (Black Marble), 75 Unityn logo pois + oma avaus, 77 radion vahti, Natiivi-UI:n erät
(65 valikko, 62 opas, 59, 69, 70, 71, 64, 66, 72, 76, 73/68 yläpalkki, 63, 74-laajennus, hyppykuvat), Linssisepän 74 ja radio-veto.
Avoinna b13:ssa: 63 lehtinimiö/mittakaava, 72 vaakunaosio, 74 d2 todennus, 78 kuvapari, 79 korttien kahva, linssipariteetin
31/39/41 (LinssiUi.Vaihtui webin listalla), lentopinnan kylmäkoe, uuden peruskarttasarjan pohja + vektorirajat.
BUILD-sana vasta Laitetestaajan savukierroksen jälkeen (Natiiviseppä nollautumassa klo 10.4x → uusi sessio jatkaa).

## Omistajan löydökset build 12:sta (53–79), kuvat docs/raportit/kaappaukset/omistaja-20260925/
53 Ohita ei lopeta pulua, 54 puhekupla saapuessa, 55 noppa ei jatku liftatessa (tehty), 56 kartta ei zoomaa nopan jälkeen (tehty),
57 reitti ei piirry, 58 Maailma-tila ei vaihda kaupunkia, 59 lehti avautuu saapuessa, 60 siirtymäreitit jäävät → LIIKKUMISEN
PARITEETTIKIERROS (lista docs/raportit/liikkuminen-pariteetti-20260925.md Pelikoodarin checkoutissa, 41 ERI + 13 PUUTTUU,
Laitetestaajan videot); 61 kortin kamera zoomaa ulos (48 ei ollut b12:ssa, b13:ssa), 62 turistiopas päällekkäin, 63 Nähtävyydet,
64 kaupunkilehti tökkii (simulaattorissa 1:1 — laitteella mitattava), 65 ☰ kaikille, 66 pulun animointi (Pelikoodari b3e0b67 +
Natiivi-UI), 67 chat katkeaa (worker, #3139 mainissa), 68/73 yläpalkki, 69 nostopaneeli ei reagoi (Clickable), 70 Maakunnat väärä
maa (web #3140 mainissa + natiivi), 71 radio-nappi (PickingMode), 72 lippukortti, 74 Ihmisen matka (a–f), 75 Unityn logo,
76 logo laukkuun, 77 musta kartta = radion jälki, 78 yläpalkin korkeus, 79 korttien raahaus kahvasta. Seuraava 80.

## Kartta
Peruskarttasarja 2026-09-25 valmis levyllä 09.11 (pyramidi 378/378, pallo Z0–Z9 349 525 laattaa); pallo poltetaan uudelleen ilman
viivatasoa (natiivi piirtää rajat vektorina), sitten ämpäriin julisteet/pyramidi/2026-09-25-* ja pallo/laatat/2026-09-25-pohja-20260925;
polut Natiivisepälle build 13:een; webin osoitin vasta omistajan kuvakokeilun jälkeen. E28 Z9–Z11 ämpärissä (199 708 laattaa).
Vektorisarja (rannat + rajakorkeudet) ämpärissä 2026-09-25-gshhs-korkeus, PR #3132 mainissa. Yövalosarja: Natiiviseppä käyttää.

## Kone (64 Gt RAM)
Aamun kuorma 500–1000: coreaudiod 300–430 % (simulaattorien ääni AudioListener-korjauksen jälkeen; sudo killall coreaudiod auttoi),
6–8 simulaattoria peleineen, poltto 16 ytimellä, Playwright 6 rinnakkain, 11 Claude-sessiota × 1,3 Gt. Sivutus 22,8/23,5 Gt.
Säännöt: joutilaat simut sammutetaan kokonaan (käännöspalvelu sammuttaa omansa), enintään 4 boottina päivällä, savukkeet 3 rinnakkain
(#3146), pariteettiajo 2 simulla, poltto ei päiväkäytön kanssa täysillä. Omistajalle ehdotettu: Siirtoseppä ja Karttaseppä voi sulkea
päiväksi. Levy 124–155 Gt vapaana. Postivahti seuraa sivutusta ja varmuuskopio-VIKA.txt:tä.

## Sisältö
Linssikatalogi 155/155 kuvitettu tuotannossa (v2215, #3138); galleria 59 integroitu (#3147, täydennystilaus 2 kaupunkia);
renessanssisalin teosluettelo #3144 + Taidemuseo-suunnitelma #3145 mainissa (v2216); vanhat sisältö-PR:t auditoitu ja mergetty
(#3149), jäljellä #2895 (ristiriita) ja #2991 (julistekuvat tilattu). Sisältökirjuri: turistioppaat 71 kaupungille 3:n erinä
(#3148 erä 1), jatkuva tehtävä. Linssiseppä: Maapallon tila -aineistosuunnitelma (a3468dde9) ja Taidemuseo odottavat pariteettia.
Natiivin työkalut proto-gitissä tyokalut/palvelu (8b3660d0); varmuuskopiopeili korjattu (peili/proto/* force, master ff).

## Sessiot (id:t) — nollattu tänään: Linssiseppä 00.5x, Natiivi-UI 02.46 ja 08.0x, Natiiviseppä 04.5x ja 10.4x (kesken),
Laitetestaaja 05.4x, Pelikoodari 06.0x, Sisältökirjuri 09.0x
Julkaisija (Opus) local_9922c4b6-320f-4074-aed4-f2811a7c9640; Natiiviseppä local_860f922b-94b8-49da-975d-4233a993bbb8;
Pelikoodari local_7b5a6c65-e4fd-4142-b21f-e12089f5b417; Natiivi-UI local_9ed5a7df-5c9c-47e5-be64-bad4353b81b9;
Linssiseppä local_3273f209-099d-4ed3-830e-e4e1b40bcc7d; Siirtoseppä local_7a1255c5-d525-4323-9438-70e7379ad2fe;
Karttaseppä local_445a5c7b-4317-4989-b65d-4cb81bd10056; Sisältökirjuri local_e5685e4a-4ed7-41f4-96f0-5899ff6d8d7f;
Laitetestaaja local_992b689f-357b-4ce1-a236-b69d1cfcb0d5 (SendMessage vaatii [ref] — kaksi samannimistä);
Postivahti local_6f3d4c35-be83-4985-82c7-8d641ad18f1d.

## Opit
- Omistajalle annettavat komennot aina yksirivisinä (puhelimen pääte liittää heredocin yhdelle riville → jumi "cmdand heredoc>").
- Julkaisijan luokitin ei hyväksy sääntömuutoksia vertaisviestistä; Raamattu mainiin ensin, sitten sessio lukee tiedostosta.
- Fable ei voi committoida .claude/settings.json:ia (self-modification) — omistaja committoi, Julkaisija tekee PR:n, omistaja mergeää.
- SendMessage-raja täyttyy ~10 viestissä; mcp send_message session id:llä toimii aina.
- Kuormassa (load > 300) simctl jumittaa ja Playwright kaatuu käynnistyksessä (0/0) → savukkeiden punaiset ovat infraa.
- Pinotut PR:t: squash-mergen jälkeen tekijä rebasea oman haaransa; Julkaisija ei pushaa toisen roolin haaraan.
- Karttasepän polttoa ei ajeta päivällä täysillä, kun simulaattorit ja käännökset pyörivät; yöllä kyllä.

## Jono uudelle Fablelle
1. Natiivisepän nollaus loppuun (lepoilmoitus tilattu): aloitusviesti haarasta selvittaja-3d-luovutus, sitten uusi peruskarttasarja
   build 13:een ja BUILD-sana Laitetestaajan savukierroksen jälkeen → Julkaisija 1.0.13 → omistajalle rivi.
2. Omistajan build 13 -kokeilulista: kylmä käynnistys (ei Unityn logoa), äänet, kartta + rannat 0,25 + rajat, kaupunkikortti ja kamera,
   liikkuminen (noppa → kohteet → matka → saapuminen), radio (veto, sulku, yövalot), ☰ iPadilla, yläpalkki, Ihmisen matka, kahden sormen
   kallistus; löydökset 80 alkaen.
3. Pariteetin valmiiksi toteaminen omistajan kanssa (liikkumislista 0 ERI, pariteettiajo 0 > 16 px) → vasta sitten uudet linssit.
4. Karttaseppä: viivaton pallo ämpäriin, ilmoitus Natiivisepälle; webin osoitin uuteen pyramidiin omistajan kuvakokeilun jälkeen
   (Julkaisija vaihtaa Fablen käskystä); Z10 myöhemmin.
5. Omistajalta (ei kiire): joutilaiden sessioiden sulkeminen päiväksi; Fablen haaran vanhat lupaerot (gh/aws/security/xcodebuild);
   2RX77QMLHA:n poisto, Individual → Organization, GLO-30 koko maailmalle NAS:iin; viikkokiintiö 95 % → token reset.
