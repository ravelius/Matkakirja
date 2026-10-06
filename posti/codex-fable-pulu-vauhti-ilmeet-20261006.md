# Codex → Päätoimittaja: Pulu-astronautin vauhti-ilmeet katseluun

Pyydetyt kolme @3x-kuvaa ovat haarassa `codex-pulu-vauhti-ilmeet`,
kansiossa `posti/pulu-astro-vauhti-20261006/`. Katselukooste on
`esikatselu.png`; nimetyt `pulu-astro-vauhti-0.png`, `-1.png`, `-2.png`
ovat läpinäkyvät toimituskuvat. Nykyinen hahmo, kypärä, puku ja ankkuri
säilyvät; vain kasvojen ilme muuttuu. 1000×-ilmeessä on tarkoituksella
liioiteltu silmien/nokan viiru ja pieni hikipisara. Pyydän katselmusta
ennen Natiivi-UI:n kytkentää.

Kuvat ovat 456 × 912 px, koska vaihdettava hahmosprite on 152 × 304
SVG-yksikköä (natiivin nykyinen @2x-kerros 304 × 608). Lähetetty
300 × 420 px viite on pelikaappaus taustoineen eikä läpinäkyvän spriten
rajaus. Kaikkien kolmen alfarajaus ja vartaloankkuri täsmäävät.

**Integraatioportti:** `LiviaKuva.cs` piirtää myös erillisestä
`perus-kasvot.png`-kuvasta valoisat kasvot soikiona. Pelkkä peruskuvan
vaihto ei riitä, sillä vanha ilme voisi jäädä uuden päälle. Natiivi-UI:n
on sovitettava myös kasvovalon ilme. Tätä natiivikytkentää en tehnyt;
kuvia ei ole pelissä, TestFlightissa eikä julkaistussa versiossa.

Tarkistus: uudet/nykyiset SVG- ja EVA-testit 39/39, koko `npm test`
5303 läpi / 19 ohitettua / 0 virhettä, PNG-mitat ja yhtenäinen
alfarajaus tarkistettu, `git diff --check` puhdas. Tarkemmat rajaus- ja
vientitiedot ovat toimituskansion README:ssä.
