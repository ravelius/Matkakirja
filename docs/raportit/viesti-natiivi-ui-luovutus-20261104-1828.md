# Natiivi-UI: luovutus 4.11.2026 klo 18.28 (konteksti noin 25 %)

Edellinen: viesti-natiivi-ui-luovutus-20261104-1620.md (kuvaus nousukuvien commiteista, haarassa natiivi-ui/luovutus-20261104-1620). Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto (ei origin-etärepoa, ei pushia).

## Tila
**Nousukuvat `63383ba6e`** (proto `natiivi-ui/nousu-pieni-219`, wt/proto-natiivi-ui-nousu-pieni): KK hyväksyi, PT kuittasi, JU ottaa 219:n seuraavaan runkoon k45-ajon jälkeen. Älä pyydä uudelleen. Kuvat: lokit/nui-nousu-kortti-63383ba6e-20261104/kk/. Normaalivauhtinen iPhone-ajo tehdään junan iPhone-ajossa (KK).

**`dbbc2bbea`** samassa haarassa, 63383ba6e:n päällä, EI merge-pyynnössä: vaaka-iPhonen ☰ ja haku esteeksi (`TraileriLiike.Kulmanapit`, `NousuLepo(napit:)`). tarkista.sh 0 virhettä, ei simutodistusta. KK:n ohje: oma commit, ei pidättele mergeä.

**Lippu `99eb9931e`** (proto `natiivi-ui/kartan-kaanto-219`, wt/proto-natiivi-ui-kaanto), EI kelpaa vielä. Simuajo lokit/nui-lippu-99eb9931e-20261104 (L1, iPad13, iPhone18; vaiheet.txt, lippu-loki.txt, konsoli-*.txt). Ajon KUVAT EIVÄT TODISTA MITÄÄN: lippu ei näy niissä.

## Löydökset lipusta
1. **Skriptin vika:** `aja`-komennon 3. arvo on kaari ASTEINA (`KorkeusKaarelle`, Komennot.cs:616), ei korkeus säteinä. 0,21 vei kameran aivan lähelle. Mac-rivit (sk-lippu2*.txt) olivat samaa muotoa, joten nekin on tulkittava uudelleen. Korjaa: kaari = degrees(2 * tan(PuoliKulma) * korkeus R) tai muu tapa päästä koko maan näkymään.
2. **Skriptin vika:** iPad pysty ei saanut näkymää, koska lokissa on "saapuminen: FRA Korkeuteen", ei "Molempiin". Hae kumpi tahansa ensimmäinen rivi.
3. **Norja ei käytä uutta laskentaa:** `kiertosäde`-riviä ei tule, lippu menee vanhaan ankkuriin 70,42 / 30,39 (Vardø). Todennäköinen syy, todistamatta: `Kartuscha.LippuPaikka` odottaa `MaatAineisto`a vain 5 s; lippu 18.15.37.3, "maat: 199 maata" 18.15.38.5. Mac-ajon Ranskasta puuttui rivi samoin. Ehdotus: varalla ankkuri, ja kun aineisto tulee, kulma lasketaan ja lippu siirtyy (valmis-kutsu toisen kerran; `iso != maa` suojaa).
4. **iPhone vaaka: kiertosäde 0 pt** (874×402): 201 − 86 − lipun korkeus < 0, joten paluu vanhaan paikkaan 48,99 / 7,44. Ylävara 86 pt on palkille, jota vaaka-iPhonella ei ole. Ehdotus: ylävara nappien mukaan, noin 16 pt, jolloin säde on noin 59 pt. Ei tehty.
5. iPad toimii laskennan osalta: Ranska pysty 306 pt = 288 km, lippu 48,55 / 4,89; vaaka 306 pt = 369 km, lippu 48,90 / 5,37.

## SEURAAJAN JONO
1. **Lippu:** kohdat 3 ja 4 samaan haaraan, korjaa skripti (1, 2), tarkista.sh, simuvuoro JU:lta (linja JU:lta, L2 on laitekäännöksillä). Kaikki suunnat 000, 045, 135, 225 ja Ranska + Norja; iPad-vaakakuvat käännetään (skripti tekee). KS odottaa: ND:n iPad-haara tehdään ilman lippua, kunnes hyväksytty. Tulos KK:lle, rivi PT:lle.
2. **dbbc2bbea iPhone-simu:** valmis skripti lokit/nui-nousu-napit-dbbc2bbea-20261104/ajo.zsh iphone (kääntää iPhone-tilassa; PROTO_LINJA ympäristöstä, JU:n vuorolla). Todista: kuva ei peitä hakua ja korttia. Kuva KK:lle, sen sanalla merge-pyyntö PT:lle.
3. **Vanhat:** 13.56-luovutuksen kohdat 4 ja 5.

## Avoimet KK:lla
Loitonnus Ranskaan luennan jälkeen tulee säännöstä 2.136; KK kysyy omistajalta, jäädäänkö kaupunkiin. Ei korjausta nyt.

## Huomiot
- tarkista.sh päivittää tyylikirjan (3 tiedostoa): `git restore` ne, ei kuulu haaroihin.
- Ruuhkassa (kuormitus jopa 46) trailerin ajoitus hajoaa: kuvat ennen puhetta, kartta sumea tai väärällä tasolla, ja lataamattoman kuvan paikka lasketaan oletuskoolla. Älä arvioi sellaisesta ajosta ajoitusta.

## Levy
64–68 Gt vapaana. App-kopiot poistettu molemmista ajoista.
