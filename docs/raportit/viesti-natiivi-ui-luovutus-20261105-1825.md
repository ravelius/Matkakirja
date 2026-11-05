# Natiivi-UI: luovutus 5.11.2026 klo 18.25 (konteksti 35 %, kova raja)

Korvaa -1815:n; sen Tehty- ja Auki-kohdat ovat voimassa, lue myös se (haara natiivi-ui/luovutus-20261105-1815). Työhaara proto-repossa: `natiivi-ui/kyltit-219`, kärki ede32e764, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki). Haaraa EI ole Matkakirja-repon originissa; PT etsi sitä sieltä.

## Ensin
1. Kuittaa JU:lle "NUI valmis". Ei NUI:n ajoja jonossa. Ei omaa Mac-ajoa (KK): ede32e764 ja 26c7ffcfc menevät samaan seuraavaan ajoon.
2. Ajon kuvat: louvre-viisto, tuileries, chatelet, keski + yksi lähempää Orsay ja Quai Voltaire (Orsay 48.85997, 2.32653; KK:n pyyntö). Ohjelmatiedostoa sk-pariisi-kyltit.txt ei löytynyt omasta worktreesta eikä proto-3d:n neljältä ylimmältä tasolta; JU:lla se on. Lähikuvan kamera puuttuu vielä.
3. RATKAISTU, PT ja KK samaa mieltä: nimen väistö pois ennen ajoa. KK: "poista nimen väistö merkin kohdalta; tämä kumoaa edellisen sanani 'linja sopii'... Nimet pysyvät, ja merkki saa koskea nimeä. Hän näkee sen seuraavasta kuvasta ja sanoo, jos haluaa toisin. Muu ede32e764:ssä sopii." Tee: poista KeraaPyoreat:n TyhjennaPyoreat- ja KirjaaPyorea-rivit, Nahtavyysalue.pyoreatRuudut, sen Peittaa-rivi ja MalliKyltit.Piilota:n TyhjennaPyoreat, korjaa KeraaPyoreat:n kommentti.
3b. PT:N KÄSKY: "MalliKyltit.Vapaa ja HintakylttiVapaa: jos ne voivat vaihtaa kyltin sivua zoomatessa, korjaa samassa commitissa (2.215 kiinteä sivu). Pelkkä siirtymä samalla sivulla: jätä ja kerro KK:lle." NUI:n arvio koodista: molemmat VOIVAT vaihtaa sivua (MalliKyltit käy läpi KylttiSivu ja sitten muut sivut; hintakyltti käy läpi paikkalistan), joten korjaus kuuluu samaan commitiin. Kyltti pysyy omalla sivullaan ja häipyy, kun oma paikka ei ole vapaa. Hintakyltin osalta tarkista ensin KK 16.2x: "hintakyltti väistää narun pään viereen eikä katoa", ja jos tämä on ristiriidassa, kysy PT:ltä.
3c. PT:N KÄSKY: "Sitten ajo suoraan JU:lle pushatusta SHA:sta: 5 kuvaa ja rivi 'mitä tämä ratkaisee' (10.5). Tulokset 2.214:n mukaan KK:lle, kopio PT:lle." Tämä KORVAA kohdan 1 "ei omaa Mac-ajoa". PT kirjaa lokiin ja kohtaan 2.215 kylttien häipymisen usvaan.
4. Läiskä (KK): ei muutosta ennen selvitystä. Samassa seuraavassa ajossa sama lähikuva kuin kyltit-chatelet ja kysely, mikä elementti siinä kohdassa on ("mika tai vastaava"; komentoa ei ole vielä tarkistettu). KK:n vihje: sijainti lähellä kaupungin keskipistettä 48.8566, 2.3522, Hôtel de Villen aukio. Tulos rivillä KK:lle.

## Tehty ede32e764 (KÄÄNTÄMÄTTÄ, EI KATSOTTU)
KK 18.2x omistajan 2.11. 08.14 linjalla ("kiinteästi paikallaan sekä myös kiinteän kokoisia"): pyöreä merkki ei enää vaihda sivua kyltillä (NostotKartalla.KyltinSivu), 3D-kyltillä (MalliKyltit) eikä hintakyltillä (KaupunkiPallot). Kyltti piirtyy merkin päälle: noston kyltti BringToFront, ja mk-erikoisnostot luodaan mk-nostot-kerroksen jälkeen (UiNakymat 629 ja 642), joten 3D- ja hintakyltit ovat merkkien päällä; katukuvat alimpina. Orsayn oma sivu vasen: StriimiKyltinKyljet (piirroksella ennallaan).

## Auki
1. Siivous: NostotKartalla.KyltinPerusKylki-kentän ja KyltinSivun yläpuolinen kommentti kuvaavat vielä sivunvaihtoa. KyltinSivu-nimi on harhaanjohtava (nyt vain merkin päälle).
2. Vanhat väistöt siirtävät yhä kylttiä zoomatessa: MalliKyltit.Vapaa (muut kyltit, mallit, ruudun reuna) ja hintakyltti HintakylttiVapaa (nimiöt, kyltit, mallit); ei muutettu, PT:lle kerrottu. Noston kyltti ei siirry vaan häipyy törmätessään.
3. Läiskä: kohta 4 ylhäällä. Tuileries'n leike: KS tekee tiiviin uuden kuvan samasta palatsista (KS:n luovutus -1817) ja kertoo, kun se on valmis. Älä tee omaa kokoa koodiin (KS).
