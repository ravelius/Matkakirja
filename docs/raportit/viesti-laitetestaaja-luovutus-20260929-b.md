# Laitetestaajan luovutus 29.9.2026 klo 16.1x (tilinvaihto 97 %:ssa, Päätoimittajan käsky)

Haara `laitetestaaja-savukierros-b13`, **kärki e4ef21d55** (pushattu, local=origin, ei
committamattomia muutoksia omissa tiedostoissa — repossa on muiden roolien vanhoja
untracked-tiedostoja `tools/.natiivi-ui-*.mjs` ja `docs/raportit/kuvat/vuosi-ndvi-thessalia-koe-
20260928.png`, älä koske niihin, eivät kuulu tälle roolille).

**Ei avoimia merge-pyyntöjä tai PR:jä tästä roolista** (`gh pr list --head
laitetestaaja-savukierros-b13` tyhjä — tämä rooli committaa raportit suoraan omaan haaraansa,
ei PR-virtaa).

**Ei käynnissä olevia ajoja.** Molemmat omat simulaattorit Shutdown: iPhone 18 Pro
`1572C658-6455-4E55-8C05-3F88CB3C32F6`, iPad `3B4CDACB-CCBE-42EC-809D-FB4D0B43CC7D`.
Tarkista `xcrun simctl list devices | grep -E "1572C658|3B4CDACB"` — jos jompikumpi on Booted,
selvitä ensin oliko kesken ennen kuin sammutat.

## Viimeisin valmis kierros: 1.0.50 fc26b44c — 5/5 PASS
Yläpalkin matkalaukkunahka iPhonella (tikkaus, keskitummennus, kohopainatukset, ei läpinäkyvyyttä,
säilyy pillerin auki/kiinni-syklin yli), iPad ennallaan vaaka-asennossa, regressio (nostokortin
kaiutin + tekijätiedot logosta) OK. Raportti+5 kuvaa: `docs/raportit/savukierros-1050-20260929.md`
(commit e4ef21d55). Natiiviseppä ja Julkaisija kuitattu.

## Tila juuri nyt
`juna/b13 ddf90f51` ennallaan (16:00 lokissa), BUILD 50 = master `cbf78690`. Ei tiedossa olevaa
seuraavaa savukevuoroa avoinna — **odota Julkaisijan "laite NYT" -viestiä** ennen uutta
simulaattoribuuttia (protokolla, ks. alla).

## Tarkista aina näin uudessa sessiossa
1. `tail -20 /Users/Shared/Claude/proto-3d/lokit/kaannospalvelu/juna.log` — uusin käännös/juna-SHA.
2. `cd /Users/Shared/Claude/Matkakirja-laitetestaaja && git fetch origin && git log --oneline -5`
   — varmista että oma haara on ajan tasalla ja ettei toinen sessio ole pushannut väliin.
3. `xcrun simctl list devices | grep -E "1572C658|3B4CDACB"` — molempien pitäisi olla Shutdown
   kierrosten välissä; jos Booted, selvitä miksi.
4. Kuittaa Fablelle/Päätoimittajalle yhdellä rivillä uuden session alussa.

## Aiemmat tässä sessiossa tehdyt kierrokset (kaikki raportoitu ja pushattu, ei toimenpiteitä)
1.0.42-yhdistelmä (radio-löydös korjattu myöhemmin oikealla mittarilla), 1.0.43 (Pulun taulu,
selite-eleet), TF 1.0.43 -laajakierros (järvet/laatat/FPS/Pulun taulu, Päätoimittajan tilaus),
1.0.44 (avaukset, luennan alku, maakuntalappu), 1.0.44-yhdistelmä (maakuntakortin
korkeusvaihtelu-havainto, ei blokkaava), 1.0.45 (ISS-tervetulo, tarvitsi `ui linssi tervetulo
nollaa`+Äänimaisema), 1.0.46 (tervetulo seuraa Kertoja-kytkintä), 1.0.47 (kartuscha-liike, Pulun
kuplat kuvan takana), 1.0.48 (pelaajan näkymä, avaruuskävely 5/5), 1.0.49 (pillerivalikko 4/5 —
Tekijätiedot ei löytynyt pillerivalikosta, Natiiviseppä selvensi: se on logon takana/`ui tietoja`,
ei pillerissä — muisti tästä on nyt Laitetestaajan pysyvässä muistissa), 1.0.50 (nahka, ks. yllä).
Kaikki raportit `docs/raportit/savukierros-10*-20260929.md` ja `tf1043-*.md`.

## Opitut menetelmämuistutukset (uudelle sessiolle hyödyllisiä)
- **Tekijätiedot/Pelin tilannesivu**: ei pillerivalikossa — avautuu vasemman yläkulman
  MATKAKIRJA-logosta tai `ui tietoja`. "Pelin tilannesivu" -nappi logokilven alla avaa Safarin
  projekti.html:ään (poistuu pelistä — älä napauta ellei erikseen pyydetä).
- **iPad vaaka-asento**: `echo "ui kierto vaaka" > Documents/ui-komento.txt` (`ui kierto pysty`
  takaisin). simctl-kuva tallentuu silti fyysisesti pystyyn — kierrä kuva jälkikäteen
  koosteessa jos tarvitset oikean suunnan.
- **Kehittäjätila**: `kehittaja koodi` antaa VIRHEen (kehittaja-koodi.txt puuttuu) mutta
  `kehittaja tila` näyttää silti "kehittäjätila päällä" — komennot toimivat virheestä huolimatta.
- **Kartuscha (maan tietokortti)** ≠ "karttaselite" sekaannuksen välttämiseksi: kartuscha on maan
  nimen napautuksella avautuva tilastokortti (NOSTOT/VÄKILUKU/jne), eri asia kuin astro-selitteen
  `ui linssi kuvaselite`.
- **Pillerin rivit** (esim. Linssit-listassa): 1. napautus = esikatselu vasempaan sarakkeeseen,
  2. napautus TAI suora Aktivoi-napin napautus = toiminto. Tarkista aina `ui puu`:sta tarkka
  koordinaatti ennen napautusta (koordinaattimuunnos ruudulta helposti pieleen).

## Viestikanava
Julkaisija: `local_24e63224-112c-449a-b6a3-e10e4ed43f4b`. Natiiviseppä:
`local_fcc10552-5810-49bf-b0cf-188456f1231c`. Fable/Päätoimittaja (viimeisin tunnettu, **tarkista
ettei vaihtunut tilinvaihdossa**): `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31`.
**SendMessage-raja (~10/vuoro) täyttyy usein** — käytä VARAKANAVAA
`mcp__ccd_session_mgmt__send_message` (session_id = vastaanottajan local_-id) kun se sanoo
"paused"/"queued" ei riitä syyksi odottaa.

JUMI → FABLE/PÄÄTOIMITTAJA: ei AskUserQuestion-korttia; viesti ja jatka muuta.
Vain valmis kierros, jumi tai kysymys — enintään 8 riviä.

Ensin uudessa sessiossa: kuittaa Päätoimittajalle yhdellä rivillä (haara + SHA), tarkista juna.log,
odota Julkaisijan "laite NYT" -kutsua seuraavaan savukierrokseen.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
