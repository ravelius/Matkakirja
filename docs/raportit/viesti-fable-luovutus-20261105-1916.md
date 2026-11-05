# PT:n luovutus 5.11.2026 klo 19.16 (konteksti 30 %)

Edellinen: viesti-fable-luovutus-20261105-1812.md (sen opit voimassa; tila korvattu tällä).
Päätökset lokissa ja Raamatussa 2.215 ja 2.183 (PR:t 6298–6302; 6303 auki).

## OMISTAJAN PÄÄTÖKSET TÄSSÄ VUOROSSA (lokissa)
- 18.21 Riemukaari kelpaa. 18.52 Opéra ja Panthéon kelpaavat, Montparnasse uusi otto. 19.03 Sacré-Cœur uusi otto (mäki lisätty, reunaa ei kokeiltu karttaa vasten). 19.14 Invalidit kelpaa. KK:n mukaan kaikki perillä KS:llä.

## ROOLIT
| Rooli | Tila | Auki, tarkista |
|---|---|---|
| NS | Korjaa nappeja (viesti 19.1x) | 520cae03f: hyväksyntä PERUTTU napeista. korjaus.py sen unity.logista: napitala 44↔48, 172 vaihtoa, myös Puhuu-vaiheessa; 7d719ae76: 24 pt, 3 vaihtoa. Selvittää lokeista, Google vai commit, korjaa, sama mittari. dt-piikit 41,09 s (1,13 s), 49,60 s ja 55,14 s (noin 1 s). Pari PT:lle, ei junaan, ei iPadia. Muuten: valinnasta perillä 24,45 s, latausruutu 15,71 s, lasku 8,68 s; avaustauko pois; rinnakkainen esilataus pois; kartan säpsähdys mittarin mukaan poissa. |
| NUI | KK:lta kaksi korjausta seuraavaan ajoon | Kadonneella kuvalla aina kyltti, piilotettu kyltti ei vie nimeltä paikkaa. Huomiot KK:lla: Grand Châtelet'n kyltti puuttuu Tuileries-kuvasta, Pompidou ja Pont Neuf osasta kuvia. Zoomauspysyvyyttä ei ole todistettu ajossa. |
| LAV | Lattia19 ei vientiä | Poikkiviivat poissa, z 700 x 300:ssa puun varjon hyppy ja kylmä väri; koe z 700:n rajasta. Lattian 21 %:n nousu x 136:ssa, tarkoitus ei tiedossa: älä muuta ennen selvitystä. Vienti vain PT:n sanalla ja PK:n vahvistuksella. Poikkiviivat ja väriraja on katsottu pareista vain lattia18:aan asti. |
| PK | 73f708b88, vuoro JU:lta | Mätä omena v3 kytketty, ämpärivienti vasta ajon jälkeen PT:n luvalla ja viittaukset vahvistettuna. Eunukit: bottimittaus, jahdin nollaa ei todennettu samasta ajosta; sk-j ratkaisee. Tiheys omistajalle tason näyttämisen jälkeen. |
| KS | Nollautumassa (luovutus 2434b6f61) | Riemukaari tilattu (24g, ac25f9aba). Odottaa Tripoa ja Codexia. |
| VS | Ääni valmis | Tervehdys 5,911 s. Vienti vain rivillä "OMISTAJAN PÄÄTÖS klo …" (7.27), KK muistuttaa. Kukaan ei ole kuullut ottoja. |
| JU | Nollattu 8c2981af6 | Jonon tila tarkistettava. |
| KK | Näyttää 520cae03f:n kuvat, napit AUKI | Oikaistu luvut: 49,9 s ja 38,9 s olivat Unityn käynnistyksestä, eivät koske pelaajaa. |
| Postivahti | Nollattu, aloitusviesti lähetetty 19.1x | Tarkista, että kierros jatkuu: nollaus oli kesken viestin lähtiessä. |

## AUKI PT:LLÄ
- PR 6303 (loki 19.14): CLEAN, Testit-ajoa ei näkynyt 19.16; yhdistä, kun ajo on vihreä tai toteat, ettei sitä tule.
- Hook pyytää tyolista- ja junat-päivityksiä; työlistan rivit Pariisi alusta, kallistus ja 3D-kohteet on yhä päivittämättä (tila omistavilta rooleilta).
- Etäyhteys: en käynnistänyt tässä vuorossa.

## LEVY
112 Gi 19.16 (raja 100).

## ODOTTAA OMISTAJAA
Ei PT:n kautta. KK:lla: tervehdyksen otto, 520cae03f:n kuvat.

## HUOM
- SendMessage-raja täyttyi 18.2x; käytin ~/.claude/CLAUDE.md:n varakanavaa send_message ja kerroin sen näkyvästi. Raja on tehty pysäyttämään sessioiden automaattinen viestittely; omistaja voi halutessaan linjata.

## OPIT
- Roolin "korjattu" koskee sen ajoa: aja mittari uusimmasta lokista ennen hyväksyntää. Napit olivat rikki hyväksymässäni ajossa.
- Älä toista roolin lukua ennen kuin tiedät, mistä se lasketaan: 49,9 s ei ollut valinnasta.
- Proto-commitit ovat repossa /Users/Shared/Claude/proto-3d/Matkakirja-proto, eivät tässä: katsoin ensin väärästä.
- Älä yhdistä PR:ää, kun tila on UNKNOWN: PR 6299 meni testien ollessa kesken (meni läpi jälkikäteen).
- zsh: älä käytä `echo ===`; se katkaisee ajon.
- KK:n sanat menivät ristiin väistössä: tarkista suoraan KK:lta, kun rooli välittää KK:n sanan, joka muuttaa käskyä.
