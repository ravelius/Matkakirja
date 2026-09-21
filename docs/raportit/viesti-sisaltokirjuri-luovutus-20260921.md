# Luovutus: Sisältökirjuri — 2026-09-21 ilta

Sessio nollataan kontekstin (71 %) vuoksi. Kolme tehtävää tehty/käynnissä.

## 1. Visastandardi — VALMIS

Kaikki 29 maata, jotka olivat alle 1/3-visaosuudessa 20.9.2026 inventaariossa,
ovat nyt vähintään 1/3:ssa. Neljä erää, kaikki pushattu:

- `sisalto-visat-1` (jo mergetty, v2008, PR #2661): 40 visaa — BIH/CHE/GBR/ISL/NOR/RUS/TUR/UKR.
- `sisalto-visat-2`: 25 visaa — GRC/EST/DEU.
- `sisalto-visat-fokus`: poisti tests/fokusvirta.test.mjs:n GRC-vain-visakiellon (Fablen päätös: pilotin aikainen rajaus, ei yleinen linjaus).
- `sisalto-visat-3`: 43 visaa — LVA/LTU/ITA/FIN/SWE/BGR/HRV/ROU.
- `sisalto-visat-4`: 45 visaa — AUT/CZE/DNK/ESP/FRA/HUN/IRL/NLD/POL/PRT.

Menetelmä joka erässä: `node /tmp/lista-visattomat.mjs <ISOT>` (skripti
scratchpadissa, ei repossa — ks. alla uudelleenluontiohje) listasi
visattomat nostot maittain, valitsin tyyppidiversiteetin, dispatchsin
rinnakkaisia Sonnet-agentteja (yksi maa/agentti, 4-9 visaa per agentti),
tarkistin `node tools/tarkista-visakieli.mjs` + laajennettu oma
tarkistusskripti kaikille tiedostoille, `node --test tests/*.test.mjs`
0 fail, `node tools/tarkista-kaksoisavaimet.mjs`. Uusi erä pohjataan AINA
edellisen erän kärkeen (`git checkout -b sisalto-visat-N origin/sisalto-visat-(N-1)`
tai `origin/v1973-prep` kun edellinen jo mergetty) — Fablen korjaus, koska
visat-1/2 lisäsivät visan osittain samoihin kohteisiin toisistaan tietämättä.

## 2. Kadonneet monumentit, rappeutunut-luokka nykykuvat — VALMIS

Haara `sisalto-monumentit-nykykuvat`, viimeisin commit `1fe8b38a` (pushattu,
Julkaisijalle ilmoitettu, odottaa mergeä). 26 rappeutunut-kohdetta (paikka
olemassa mutta raunioitunut) kytketty 19 maahan + pilotti ESP Medina Azahara:
BEL, BGR, CZE, ESP, EST, FIN, HRV(2), HUN, IRL, LTU, LUX, LVA, NOR(2), POL(2),
PRT, ROU(2), RUS, SVK(2), SVN(2), UKR — lähde
`docs/raportit/havainnekuvat-codexille-eurooppa-20260921.md`.

Jokaisella: koordinaatit en-Wikipediasta/Wikidatasta, Millerin projektio
laudalle (kalibroitu Ateenalla joka kohteessa), aito PD/CC-Commons-valokuva
täydessä resoluutiossa R2:ssa, `ihme.osoite` on PLACEHOLDER-URL kaavalla
`https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-<slug>-loistoaika.jpg`
(404 kunnes Codex toimittaa). **Kytkentä Codexin kuvalle EI VAADI KOODIMUUTOSTA**
— kun Codex lataa kulta-aikakuvan täsmälleen tuohon R2-polkuun, se ilmestyy
automaattisesti. Julkaisija/seuraava sessio: kun Codex ilmoittaa toimituksesta,
riittää tarkistaa `curl -I` jokaiselle 26+4 (erä 1) `ihme.osoite`-URL:lle että
vastaa HTTP 200 — ei koodikytkentää.

Lisäkorjaus tässä haarassa: Karttaseppä havaitsi Bukarestin kohdekartalta
(`js/packs/maakartat.js`) puuttuvan `nosto: 'hahmotelma-curtea-veche'` -linkin
"Vanha ruhtinaanhovi" -pisteeltä (declutter-logiikka tarvitsee sen) — lisätty
commitissa `1fe8b38a`.

**Pienoismallit**: ei vielä toimitettu tätä kirjoittaessa — kun Julkaisija
ilmoittaa Codex-toimituksesta, tarkista postilaatikko/manifesti ja kytke
samalla periaatteella kuin muutkin generoidut kuvat (ei tarkempaa ohjetta
saatavilla vielä, koska toimitusta ei ole nähty).

## 3. 198 kuvatonta nostoa — KÄYNNISSÄ (aloitettu, ei valmis)

Inventaarion "Ilman kuvaa" -sarake, huonoimmat maat ensin (koko 198,
summa täsmää):

| Maa | Kuvattomia |
| --- | --- |
| GRC | 35 |
| TUR | 24 |
| DEU | 21 |
| FRA | 20 |
| HRV | 19 |
| HUN | 17 |
| BGR | 17 |
| ITA | 16 |
| ROU | 13 |
| BIH | 12 |
| GBR | 3 |
| POL | 1 |

**GRC-erä (35 kohdetta, kaikki tiedostossa js/packs/fokuskohteet-grc.js)
KÄYNNISSÄ TAUSTALLA** taskina `a36b77698932a95fa`, haara `sisalto-grc-kuvat`
(luotu origin/v1973-prepistä). **TÄRKEÄÄ: tämä on TÄMÄN session subagentti —**
**session-nollauksen jälkeen se saattaa jäädä orvoksi eikä uusi sessio näe sitä**
**automaattisesti.** Uuden session ensitoimet:
1. Tarkista `git -C /Users/samireivenen/Matkakirja-nostot branch --show-current`
   (todennäköisesti `sisalto-grc-kuvat`, koska agentit jakavat tämän
   worktreen — EI worktree-eristystä, paitsi Curtea Veche -korjaus joka
   käytti `isolation: worktree`).
2. Tarkista `git -C ... status` ja `git -C ... log --oneline -3` nähdäksesi
   onko GRC-agentti ehtinyt committoida (todennäköisesti EI, koska ohje ei
   pyytänyt committia agentin sisällä — TARKISTA ja committoi/pushaa itse
   jos työ on valmis mutta committoimatta).
3. Jos agentti näyttää yhä olevan kesken (osa 35:stä kuva-kentästä
   puuttuu), joko odota sen luontaista valmistumista (jos se yhä elää) tai
   jatka työtä itse samalla menetelmällä (ks. alla).

**Menetelmä muille maille (TUR, DEU, FRA, HRV, HUN, BGR, ITA, ROU, BIH, GBR, POL)**:
1. Uudelleenluo listausskripti scratchpadiin (ei säilynyt repossa):
   ```js
   // listaa <ISO>-maan kuvattomat nostot: onKuva = tiedosto || kuva.osoite || kuvat.length || herokuva
   // rakenne: lue js/packs/{maastokohteet,hahmotelma,maalehtinostot,fokuskohteet}-<iso>.js,
   // kerää syvyyshaulla leaf-nostot (onNosto: on nimi-kenttä, ei nostot-arraytä),
   // tulosta id+tyyppi+nimi niille joilla ei kuvaa.
   ```
   (täysi versio oli `/tmp/lista-kuvattomat.mjs` tässä sessiossa, scratchpad-polku
   session-kohtainen — kirjoita uudelleen tai kopioi tämän dokumentin viereen jos
   löytyy vanhasta scratchpadista).
2. Yksi maa = yksi haara = yksi agentti (JOS koko maan kuvattomat ovat SAMASSA
   tiedostossa, kuten GRC — käytä YHTÄ agenttia koko tiedostolle rinnakkaisten
   agenttien sijaan, koska useampi agentti EI SAA kirjoittaa samaan tiedostoon
   yhtä aikaa ilman worktree-eristystä — konfliktiriski). Jos maan kuvattomat
   jakautuvat useaan eri tiedostoon (esim. maastokohteet-X.js JA hahmotelma-X.js),
   näitä VOI ajaa rinnakkain koska ne ovat eri tiedostoja.
3. Agentin ohje: `node tools/hae-commons.mjs haku "<hakusana>" 15` kuvan
   etsintään, `tools/hae-commons.mjs tiedot "File:..."` lisenssin
   vahvistukseen, lataa TÄYDESSÄ RESOLUUTIOSSA (`curl -sSL -A
   "Matkakirja/1.0 (...)" ".../Special:FilePath/<enkoodattu>"`, vähintään
   1200 px), vie R2:een `karttanostot/<pvm>/<iso>-nosto-<tunnus>-<hash>.jpg`
   (`zsh -c 'source ~/.zshrc; aws s3 cp ... --endpoint-url "$PAATE" ...'`,
   AWS-avaimet ~/.zshrc:ssä), tarkista `curl -I` HTTP 200 ennen koodiin
   kirjoitusta, lisää `kuva`-kenttä TÄSMÄLLEEN vierekkäisten jo-kuvallisten
   nostojen kaavan mukaan (skeema vaihtelee tiedostotyypeittäin — TARKISTA
   AINA 2-3 esimerkkiä samasta tiedostosta ennen kirjoitusta, älä oleta).
   Eläinkohteille (elain-tyyppi): kuvassa itse eläin lähikuvassa.
4. Tarkistus per erä: `node --check`, `node tools/nostoinventaario.mjs`
   ("Ilman kuvaa" laskee), `node --test tests/*.test.mjs` 0 fail,
   `node tools/tarkista-kaksoisavaimet.mjs`.
5. Erän koko 30-40 kuvaa (Fablen ohje) — yksittäinen maa jos lähellä tuota
   kokoa (GRC 35 sopii yhtenä eränä), muuten yhdistä 2+ pienempää maata
   samaan erään/haaraan.

## Muuta avointa

- Julkaisijan jonossa: `sisalto-visat-2`, `sisalto-visat-3`,
  `sisalto-visat-4`, `sisalto-visat-fokus`, `sisalto-monumentit-nykykuvat`
  (viimeisin commit 1fe8b38a) — kaikki testattu 0 fail, ei mergetty vielä.
- `sisalto-grc-kuvat` (käynnissä, ei vielä pushattu — ks. yllä).
