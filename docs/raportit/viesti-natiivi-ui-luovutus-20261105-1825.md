# Natiivi-UI: luovutus 5.11.2026 klo 18.25 (konteksti 35 %, kova raja)

Korvaa -1815:n; sen Tehty- ja Auki-kohdat ovat voimassa, lue myös se (haara natiivi-ui/luovutus-20261105-1815). Työhaara proto-repossa: `natiivi-ui/kyltit-219`, kärki ede32e764, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki). Haaraa EI ole Matkakirja-repon originissa; PT etsi sitä sieltä.

## Ensin
1. Kuittaa JU:lle "NUI valmis". Ei NUI:n ajoja jonossa. Ei omaa Mac-ajoa (KK): ede32e764 ja 26c7ffcfc menevät samaan seuraavaan ajoon.
2. Ajon kuvat: louvre-viisto, tuileries, chatelet, keski + yksi lähempää Orsay ja Quai Voltaire (Orsay 48.85997, 2.32653; KK:n pyyntö). Ohjelmatiedostoa sk-pariisi-kyltit.txt ei löytynyt omasta worktreesta eikä proto-3d:n neljältä ylimmältä tasolta; JU:lla se on. Lähikuvan kamera puuttuu vielä.
3. Odottaa PT:n vastausta: nimien väistö pyöreästä merkistä (26c7ffcfc) on NUI:n oma ratkaisu, ei omistajan päätös. Jos PT tai KK sanoo pois: poista KeraaPyoreat:n KirjaaPyorea-rivit, Nahtavyysalue.pyoreatRuudut ja Peittaa-rivi.

## Tehty ede32e764 (KÄÄNTÄMÄTTÄ, EI KATSOTTU)
KK 18.2x omistajan 2.11. 08.14 linjalla ("kiinteästi paikallaan sekä myös kiinteän kokoisia"): pyöreä merkki ei enää vaihda sivua kyltillä (NostotKartalla.KyltinSivu), 3D-kyltillä (MalliKyltit) eikä hintakyltillä (KaupunkiPallot). Kyltti piirtyy merkin päälle: noston kyltti BringToFront, ja mk-erikoisnostot luodaan mk-nostot-kerroksen jälkeen (UiNakymat 629 ja 642), joten 3D- ja hintakyltit ovat merkkien päällä; katukuvat alimpina. Orsayn oma sivu vasen: StriimiKyltinKyljet (piirroksella ennallaan).

## Auki
1. Siivous: NostotKartalla.KyltinPerusKylki-kentän ja KyltinSivun yläpuolinen kommentti kuvaavat vielä sivunvaihtoa. KyltinSivu-nimi on harhaanjohtava (nyt vain merkin päälle).
2. Vanhat väistöt siirtävät yhä kylttiä zoomatessa: MalliKyltit.Vapaa (muut kyltit, mallit, ruudun reuna) ja hintakyltti HintakylttiVapaa (nimiöt, kyltit, mallit); ei muutettu, PT:lle kerrottu. Noston kyltti ei siirry vaan häipyy törmätessään.
3. Läiskä ja Tuileries'n leike: -1815.
