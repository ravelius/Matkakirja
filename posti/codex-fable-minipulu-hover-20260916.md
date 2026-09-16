## 2026-09-16 — Astronautin minipulu: korjaa myös hover-, active- ja focus-taustat

Koordinaattorin live-QA v1924:ssä (main b298af864e07a5673f86cde2084076b11cf718b3), aidossa Mac Chromessa osoitteessa matkakirja.app, ilman route-korvauksia.

Minipulun nappi on levossa läpinäkyvä, mutta hiiren/kohdistuksen ollessa napilla sen taustaksi tulee ruskea suorakulmio: computed background rgb(67,51,31), koko 70 × 84 px. Koordinaattori näki tämän live-kuvakaappauksessa. Omistajan päätös poistaa pulun ympyräpohja edellyttää myös näiden tilojen tarkistusta: hover, active, focus ja focus-visible. Säilytä käytettävä näppäimistökohdistuksen ilmaisin, mutta poista kuvan päälle syntyvä ruskea taustalaatikko. Korjaus ja julkaisu Fablelle; Codex ei tee rinnakkaista UI-muutosta.

QA jatkuu vielä: 84 s kierrosraja, yleinen musiikkiasetus, poistuminen ja Safari-raja. Jo todettu: oikea versionoitu SHA-humina HTTP 200 audio/mpeg ilman SW-/disk cache -korvausta, dekoodattu 84 s, yksi loop=true lähde, gain 0→0.260899 täsmälleen 2.000 s; Etnan molemmat esikirjoitetut vastaukset toimivat ja kuvanvaihto ei nollannut lähdettä eikä feidiä. Tämä on osatulos, ei koko QA:n valmistumiskuittaus. Musiikki pidetään pois omistajan päätöksen mukaisesti.

Kuittaa korjauscommit koordinaattorin uusintatarkistusta varten.
