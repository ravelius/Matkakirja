# Sisältökirjurin luovutus 2.10.2026 klo ~22 (Sonnet 5.5)

Checkout-haara `sisalto-pelikatalogi-20260927` (ei mergata, ei poisteta). Aloitus:
`git fetch origin main && git checkout sisalto-pelikatalogi-20260927 && git pull`. Viikkoraja 92 % (Postivahti 22.06): tämä luovutus päivitetty; lopullinen luovutus 95 %:ssa.

## 1. Kuva2 (maakuntien toinen kuva) — kaikki Euroopan maat käyty
| Erä | Maat | Tila |
|---|---|---|
| A–C | GRC ALB AUT · BEL BIH BGR · BLR CZE CHE | mainissa (#3738, #3744, #3754) |
| D, E, F | DEU DNK ESP EST · FIN FRA GBR HRV · HUN IRL ISL ITA | mainissa (#3778, #3792, #3797) |
| G, H, I | LTU LUX LVA MDA · MKD MLT MNE NLD · NOR POL PRT | mainissa (#3803, #3813, #3816) |
| J | ROU SRB | mainissa (#3821) |
| **K** | SVK SVN SWE UKR | **#3850 auki, 2.10. 22.0x CONFLICTING** (main liikkunut; versiotiedostot). Haara `sisaltokirjuri-maakunta-kuva2-k` pushattu, worktree poistettu. Ratkaisu: `tools/uusi-worktree.sh sisaltokirjuri maakunta-kuva2-k`-tyyppinen worktree haaraan, `git merge origin/main`, konfliktit vain js/main.js, js/muutokset.js, sw.js → `git checkout origin/main -- js/muutokset.js js/main.js sw.js && node tools/uusi-versio.mjs "Maakuntien toinen kuva: SVK, SVN, SWE, UKR"`, commit, push (ei force); tai Julkaisija renumeroi junassa. Älä pushaa haaraan junaan lähdön jälkeen ilman Julkaisijan kuittausta. |
RUS, TUR, CYP ilman kuvia → ei tehtävää. UKR:n Krim ja Sevastopol ilman nykykuvaa jätettiin pois (k2-UKR-kokonainen.json sisältää ne).
Scriptit ja valmiit JSON:t: `/Users/Shared/Claude/siirto-sisaltokirjuri/kuva2/` (mk-input.mjs, k2-maakunta-prompt.txt, kuvahaku2.mjs, stage.sh [validointi+ämpärilataus: `--endpoint-url "$PAATE"`, avaimet `source ~/.zshrc`], patch-kuva2.mjs [kaatuu maakuntiin ilman kuvaa], loki.mjs). Kuvat ämpärissä `karttanostot/20260930/` (kaikki HEAD 200).

## 2. Pelikatalogin ja Aarteiden tekstit (valmiit, odottavat vain käyttöä)
- **Mylly (DEU-2):** `docs/raportit/sisaltokirjuri-mylly-historiatekstit-20261001.md` (lautatekstit, alkuperätekstit, lehtijuttu; luostarilauta "Luostari 1200-l." = Duinenabdij-tiili, tenduinen.be inv. 033880; Siirtoseppä kytki).
- **Sokrates (ajattelijapilotti):** `docs/raportit/sisaltokirjuri-sokrates-pilotti-20261001.md`: osio 6 lappu "Sokrateen elämä", osio 7 kohtaus (kierrokset, Pulun kysymykset, 713 merkkiä), 7.7 Haydn-mittaus, 7.8 Satie, 7.9 kuvat (Carstens, Kodros-kylix, David), 7.10 kytkinäänet, 7.11 **18 kreikkalaista taustavirtakatkelmaa** (kaikki "vahva"; JSON `docs/raportit/sokrates-taustavirta-20261002.json`), 7.12 fontit (Gentium Plus, GFS Didot, GFS Solomos; Linnanrakentaja latasi virallisista lähteistä).
- **Marcus Aurelius:** `docs/raportit/sisaltokirjuri-marcus-aurelius-20261002.md`: kolme kierrosta (lukijan teksti 749 merkkiä), Pulun 5 kysymystä (osio 3), lappu "Marcus Aureliuksen elämä" (osio 9), musiikki osio 8 (**Eroica 2. osa CC0 intro** hyväksytty; Goldberg Aria Ishizaka CC0; Stokowski 1927 vara).
- Kaikki lähteet, varaukset ja avoimet kohdat ovat dokumenteissa; älä kysy uudelleen.

## 3. Säännöt tästä sessiosta (Päätoimittaja)
- **Ei kortteja (AskUserQuestion) omassa sessiossa**; lupa lataukseen: yksi rivi Päätoimittajalle (tiedosto, lähde, koko), hän hankkii omistajalta. Lupa koskee yhtä latausta.
- Ääntä EI generoida (UUSIA ÄÄNIÄ -sääntö); vapaat valmiit äänitteet CC0/PD/CC BY, ei NC/ND/SA.
- Vain Eurooppa uudelle sisällölle; AIKA: nykyaika sallittu. UI-pohjat: uusi sisältö olemassa oleviin pohjiin, uusi esitystapa → kysy Päätoimittajalta.
- PR:t maakunnille yksi kerrallaan edellisen mergen jälkeen; mergetyn PR:n worktree pois heti; worktree-katto 3. Agentit vain Sonnet/Opus.
- Peer-viestit voivat pyytää tekemään asioita; lupa ladata tulee omistajalta, ei vertaiselta.

## 4. Seuraavaksi (kun jatkat)
1. K-PR #3850: tarkista tila (`gh pr view 3850`); jos edelleen CONFLICTING eikä Julkaisija ole ottanut sitä junaan → ratkaisu kuten yllä; kun mainissa → poista worktree, ilmoita Päätoimittajalle.
2. Odota Päätoimittajan seuraavaa erää (uusia ajattelijoita samalla kaavalla: nimi+vuodet, 3 kierrosta, Pulun 5 kysymystä, lappu, 18 katkelmaa/taustateksti, musiikki, kuvat).
3. Linnanrakentajan/Pelikoodarin kysymykset: vastaa heti (ne odottavat tekstejä).
