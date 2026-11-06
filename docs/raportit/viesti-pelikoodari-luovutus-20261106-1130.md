# Pelikoodari: luovutus 6.11.2026 klo 11.30: b8 protossa, ovilehti v2 mediassa, peukalokohdat kortilla

Täydentää -0950:tä; sen kohdat 4, 5 ja työkalut sekä -0924:n OPIT pätevät, ja kohdat 1, 2, 3 ja 6 on korvattu tässä. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `c9db47578`, b8, puhdas, ei pushattu. Ei junaan. **Taso 1 on yhä pääasia.** Ei ajoa käynnissä.

Lukulista: periaatteet, 7.4, 7.23–7.25, 7.37, 7.47, 9.1–9.3, 9.5, 2.177 alku ja 2.209 luettu; luvut 6 ja 12 vain rivien alut; luvun 4 UI-POHJAT lukematta (työ ei koskenut UI:ta, peukalokohdat koskevat: lue ennen niiden muutosta).

## 1. Tehty
- **b8-runko protoon:** `186531fd5`. Ristiriidassa säilyi proton jahtikorjaus lokeineen (rungon rivi oli sama korjaus). `unity-tarkistus` 0 virhettä, testit 867/867. Runko on sen jälkeen edennyt: `ce65ccfe4` ei ole protossa.
- **Ovilehti v2 tarkistettu ja kuitattu Codexille** (`13602e516`, postilaatikko): SHA256SUMS, mustan osuus 13,6 % → 0 % ja 36,5 % → 0 %, geometria ja muut kuvat tavulleen samat, peiton sisällä 48 pikseliä muuttui. Väri JPEG → PNG, lehti +0,69 Mt.
- **Hämärän lehti leivottu v2:sta:** `c9db47578`. Vain 12 pikseliä muuttui (x 509, y 184–195). Kuvassa 7 täysin mustaa pikseliä on leivonnan peittämättömiä, sama v1:ssä; ei korjattu.
- **Ajo sk-u** (`c9db47578`, L2, b8; `lokit/pelikoodari-sk-u-c9db47578`): musta merkki ja pisteviiva poissa, katsottu täysikoossa. 3×-suurennoksessa yhä hyvin haaleita katkoviivoja saumoissa. Peukalokohdat näkyvät 14 % / 86 %, 70 %, eli `81d3e839c` on nyt nähty pelistä. Peli-404: 5, joista 4 tunnettuja ja `ovi-karmi` oletuspolusta ennen vientiä.
- **Pari KK:lle:** `pari-ovi-koko-v1-b7_v2-b8.png` ja `pari-ovi-merkki-v1-b7_v2-b8.png` samassa kansiossa. KK kelpuutti, PT kuittasi.
- **Vienti mediaan:** JU vei 3 GLB:tä polkuun `juoksupeli/ovi-v1/`. Tarkistettu julkisesta osoitteesta 11.27: kaikki 200, SHA:t täsmäävät. Viittaukset ennen vientiä: `juna-215`–`218`, `runko-217-tf`, `ce65ccfe4` 0 viittausta, joten julkaistu ei muuttunut.

## 2. Auki
1. **Peukalokohdat: odottaa KK:n korttia omistajalle, älä muuta koodia ennen sitä (PT).** KK pyysi: "Saavat näkyä vain alussa tai kunnes pelaaja on käyttänyt ne", koska 77 s:n kohdalla ne näyttävät oransseilta läiköiltä. Se kumoaisi omistajan sanat 21.10. 08.58 ("Normaalipelitilanteessa näytä peukaloiden keskikohdat kevyellä vaalealla läpinäkyvällä ympyrällä"; väri 11.22). Sanat ovat koodin kommenteista, lokista ei osumia hauilla `peukalokoh`.
   - Suositus KK:lle: näkyvät ensimmäiseen ohjaukseen asti ja häviävät pehmeästi; opetuksen syke ja rimpuilun hehku säilyvät.
   - Kohta: `JuoksupeliNakyma.cs:1905`, `tila`-lasku, ja rivit `Peukalo(peukaloV…)` sen alla. Häivytys on valmiina USS-siirtymässä (0,25 s).
   - Jos omistaja pitää ne: "kevyt" ei nyt täyty (token `--tk-kuulto-accent-dark-14`, näkyy oranssina), himmennys ei muuta päätöstä. KK vastaa.
   - Korjaus kulkee seuraavan kuvan mukana, ei omaa ajoa (KK).
2. **Liike oven ohi yhä näkemättä** (-0734 kohta 3.1): sk-u on 2 pysäytyskuvaa. Katso seuraavassa ajossa, jossa juostaan oven ohi lähellä seinää. PT muistutti.
3. **Kuva KK:lle ovi ja keisari:** pari kattaa saman kohdan, KK nähnyt. Kameran väistö lokissa 0,7 m (s 120,6).
4. **LAV:n seinät (LAV 10.0x, Muuri/KORJAUS.md):** LAV vahvisti kuvin listani kaikki 7 seinää, myös (-275,8), (155,1), (-81,1). Pois kuvalla myös (-105,4), (-69,8), (-95,2) x 2. (206,2):ssa todennäköinen toinen rako lounaassa noin (199,5; 431,5), arvio: katso kartalta. Seinät rakentamatta. **Karttaa ei ajeta, ennen kuin LAV:n seuraaja kertoo juuren olevan valmis.** Sitten kartta ja rajat uudelleen (-0004 kohta 2.1); PK vahvistaa viittaukset ennen vientiä.
5. **Runko edennyt:** yhdistä `julkaisija/runko-219-muisti` protoon, kun seuraavan kerran jatkat koodia. Älä vertaa b7- ja b8-kuvia ilman merkintää; sk-u:n pari on merkitty.
6. **`ovikoe juuri` pois tulevista käsikirjoituksista:** ovi tulee nyt mediasta. Vanhat sk-tiedostot osoittavat `mallit-v1`:een (musta merkki palaa), `sk-u.txt` `mallit-v2`:een. Mediassa on v2, polun nimi on `ovi-v1`, koska koodi hakee sen; seuraava mallimuutos menee uuteen kansioon.

## 3. Työkalut
Scratchpadin skriptit katoavat. Pelikuvien rajaus: sama rajaus (1954, 1266, 2554, 1866) merkin kohdalle. `vapaa-1/sk-u.txt` toistaa pysähdyksen. `leivo-lehti.py <glb> <ulos.png>` kuten -0950.

## OPIT
- Tarkista pyyntö omistajan aiempia sanoja vasten myös KK:lta tullessa: koodin kommentti kertoi 21.10. päätöksen, jota lokihaku ei löytänyt.
- Julkisen URL:n koetus ennen vientiä voi jäädä välimuistiin 404:nä; käytä `aws s3 ls` (JU). Kaksi HEAD-pyyntöäni ei haitannut (`cf-cache-status: DYNAMIC`), mutta tapa oli väärä.
- Lue PT:n ehto vasta sitten vastaa: "ei rungossa" ei riittänyt, vaan TF-haarat oli käytävä läpi.
- Bash-silmukan `echo ======` kaatuu zsh:ssa (`=`-laajennus).
