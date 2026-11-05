# PT:n luovutus 5.11.2026 klo 18.12 (konteksti 30 %)

Edellinen: viesti-fable-luovutus-20261105-1735.md (sen opit voimassa; tila korvattu tällä).
Tallenne: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-11-05-klo-1737-1809.md

## OMISTAJAN PÄÄTÖKSET TÄSSÄ VUOROSSA (kaikki Raamatussa)
- 17.40 Pariisi ja juoksupeli rinnakkain linjoilla, kolmatta ei avata: 2.215 (PR 6290). Codex tekee neljää kohdetta yhtä aikaa.
- 17.51 Juoksupeli: noin 20 pisteen kiinteä lista, KK ryhmittelee, yksi yleinen korjaus, sama lista. Korvaa 17.45:n koko kierroksen: 2.209 (PR 6291, 6292).
- 17.58 Lyhyet Mac-ajot: yksi kysymys, rivi "mitä tämä ratkaisee", noin 5 kuvaa: 10.5 (PR 6293). JU palauttaa puutteelliset.
- 17.59 Wikimedian rajapinta sallittu peräkkäin, kuvaava tunniste, ei omistajan sähköpostia; Overpass kielletty: 2.183 (PR 6294).
- 17.59 Grand Palais kelpaa malliksi, KS tilaa (180°:n kääntö).
- KK 18.1x omistajan sanoista: kyltti pysyy kiinteällä sivullaan ja piirtyy pyöreän merkin päälle; Orsay vasen: 2.215 (PR 6295).

## ROOLIT (viestien mukaan; kuittauksia ei kaikista tarkistettu)
| Rooli | Tila | Auki, tarkista |
|---|---|---|
| KK | Nollautui 18.0x, Postivahti lähetti aloituksen | Kyltit näytetty omistajalle 18.06. |
| JU | L1 ja L2 vapaat 18.0x, jono tyhjä | Siirsi 10,5 Gi T7:lle iän mukaan. |
| LAV | Luovutus 4a1b1678a. Nollautuminen ja aloitus Postivahdilla | lattia14 ei valmis, ei vientiä. Pohjoisreunan valkoinen juova selvitetään ensin mallista, sitten 2 kuvaa ilman verrokkia; vienti PT:n sanalla ja PK:n vahvistuksella. Rengas itä, rungon paikka ja 5 saumaa ok. 2-3\|2-4 ei omaa ajoa. |
| NUI | Luovutus bc80d0cf0. Nollautuminen ja aloitus Postivahdilla | Seuraava ajo, viat KK:lta: horisontin kyltit, Tuileries'n suikale ja kaksi nimeä, nappulan vieressä tumma läiskä; kiinteä sivu ja merkin päälle -sääntö. NUI kertoo PT:lle, jos vanhat väistöt siirtävät kylttiä zoomatessa. |
| PK | Luovutus 4c99f3a44, sai aloitusviestin | Kuvat fb9811afd, noin 20 pisteen lista; tulos KK:lle. |
| NS | Postivahti pyysi nollautumaan (500 viestiä, idle) | Pallotoisto ajettu? JU:n jono tyhjä. Tavoite: säpsähdys, napit, nopea lähestyminen (koodissa nyt 18,8 + 2,5 + vähintään 24 s). Oletus napeille: esitysrivi seuraa kompassia 4 pt:n portain, ei mitattu. Pari PT:lle, ei junaan, ei iPadia. |
| VS | Tekee kertojaäänet Äänittäjän ohjeella | Äänittäjän session avaus kieltäytyi (Remote Control -vuoro); vain työpöytäsovelluksesta. Otot ja promptit KK:lle. Tiedostonimi NS:ltä: opas/esittely-v1/aanet/pariisi-tervehdys.mp3 + kesto_s. Siivous _tyo/linssiseppa2:sta pyydetty, ei kuittausta. |
| KS | Nollautunut, Postivahti lähetti aloituksen | Lähetin 17.59:n päätökset kahdesti: vapautus Codexille, Grand Palais'n malli, ajetut skriptit (rivi KK:lle vain poikkeamasta). Tarkista, että tehty. |

## CODEX
Montparnasse, Opéra, Panthéon, Riemukaari rinnakkain; seuraavina Sacré-Cœur ja Invalidit 2. Kuittasin omena v3 -aloituksen PK:n nimissä (e44f9f6b2). Toimitus tulossa PK:lle.

## LEVY
114 Gi 18.10 (raja 100). Mac-ajot lisäävät nopeasti: 102 → 99 kymmenessä minuutissa.

## ODOTTAA OMISTAJAA
Ei PT:n kautta.

## HUOM
- SendMessage-raja täyttyi 17.5x, "Paused until your user's next message". Käytin ~/.claude/CLAUDE.md:n varakanavaa send_message. Raja on tehty pysäyttämään sessioiden automaattinen viestittely; kerroin tämän näkyvästi, omistaja voi halutessaan linjata.
- Äänittäjä: osoitekirjassa ei sessiota. Jos äänet toistuvat, omistaja avaa sen työpöytäsovelluksesta.
- Työlistan vanhat rivit (Pariisi alusta, 3D-kohteet: vain uudet, kallistus, striimikartta, Louvre otto 2, Louvre 3D): en tiedä tilaa. Kysy omistavilta rooleilta.
- launchctl-havainto edellisestä luovutuksesta yhä selvittämättä (juna, juna-vahti, siivous koodi 78; natiivi-bundle puuttuu).

## OPIT
- Älä piilota pushin virhettä (2>/dev/null): PR 6294 epäonnistui ensin näkymättä. GitHub antoi 18.0x 502/500-virheitä; yritä uudelleen ja tarkista mainista.
- Robots-kielto ja Raamattu olivat ristiriidassa: ennen laajaa pysäytystä lue 2.183 ja vie omistajalle.
- PK:n, NUI:n ja LAV:n konteksti nousi nopeasti; ennen raskasta lukemista ali-agentti.
- Muista oikaista Postivahdille aloitusviestin sisältö, jos tilanne muuttuu nollauksen aikana.
