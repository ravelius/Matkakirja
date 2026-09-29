# Natiivin hypyllä aukeavat ja sulkeutuvat pinnat (29.9.2026)

Omistaja 29.9.: "Voiko lapun aukeamisen ja sulkeutumisen animoida? Ja jatkossa myös kaikki vastaavat" (Raamattu PR #3602).
Inventaarion teki Sonnet-ali-agentti koodia lukemalla; Natiivi-UI toteuttaa ja todentaa laitteella.
Pohjana on master c7c5b8e7 (BUILD 42) ja haara natiivi-ui/maakuntalappu.

Malli on webin arvot (Siirtoseppä): mittakaava 0,92 ↔ 1 ja läpinäkyvyys, origo avaajan suunnasta. Auki 220 ms
(läpinäkyvyys 180 ms) ease-out-cubic, kiinni 200 ms ease-in ja poisto 40 ms myöhemmin. Pieni liike: heti.
Maakuntalappu ja -kortti on tehty jo haarassa natiivi-ui/maakuntalappu (bcc8de80).

## Hyppy (erä "avaukset animoiden")

| tiedosto:rivi (UI/) | pinta | avaus | sulku | avaaja |
|---|---|---|---|---|
| Nostokortti.cs:530 / :272 | Nostokortti | hyppy (NaytaHeti) | animoitu 200 ms | nostomerkki |
| Kartuscha.cs:519 / :564 | Kartuschan sisus (maatieto) | hyppy | hyppy | kartuscha |
| Noppa.cs:170 / :259 | Nopan kerros | hyppy | hätäsulku hyppy (normaali animoitu) | heitto |
| OfflineTilaUi.cs:109 | Verkoton-pilleri | hyppy | hyppy | tila |
| KortinLukija.cs:644 | Lukijan asetusvalikko | animoitu | hyppy (RemoveFromHierarchy) | ratas |
| Minipopup.cs:124/155 / :163 (Pikkuseloste) | i-selite | hyppy | hyppy | i-nappi |
| Linssit/LinssiValikko.cs:147 / :158 | Linssivalikko | hyppy | hyppy | linssinappi |
| Linssit/Kuvanakyma.cs:185 / :231 | Astronautin kuvanäkymä | hyppy | hyppy | kohteen napautus |
| NostotKartalla.cs:931 / :939 | Nostojen viuhka | hyppy | hyppy (USS:n siirtymä kuollut: arvot eivät vaihdu) | nostomerkki |
| Pulu/Matkakirjakortti.cs:393 / :419 | Matkakirjan lappu | hyppy | hyppy | Pulu |
| Ylapalkki.cs:201 | Elämäselite | hyppy | hyppy (myös 7 s:n automaattinen) | elämäpalkki |

## Tarkoitukselliset hypyt, ei muuteta

- LinssiPeite.cs:37: linssin odotuspeite tulee heti.
- AvausTausta.cs:60: linssin avauksen musta tausta.
- AstronautinNakyma.cs:72: avauksen musta.

## Päätettävät

1. Nostokortin avaus on välitön löydöksen 134 takia (omistaja: "nosto aukeaa välittömästi"). Onko se yhä voimassa,
   vai animoidaanko myös nostokortin avaus 220 ms:ssa?
2. Kuvanakyma.cs on Linssisepän tiedosto, joten sen muutos tehdään sovitusti Linssisepän kanssa.

Arvio: noin 10 kohdetta, 2–3 kohdetta tunnissa laitteella todennettuna.
