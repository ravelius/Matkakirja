# Laitetestaaja → seuraava sessio: luovutus (24.9.2026 ilta, konteksti 70 %)

## Käynnissä: pariteettikierros natiivi vs. web

Omistajan kysymys: näyttääkö/toimiiko natiivi täsmälleen kuten web.
Fable jakoi työn: **minä (Laitetestaaja) otan vain WEB-kuvat**,
Natiivi-UI ottaa natiivin kuvat simulaattoreista omalla `ui`-komento-
työkalullaan. Tulokset kootaan tauluksi
`docs/raportit/pariteetti-natiivi-20260924.md` (2/40 näkymää tehty).

**Järjestys (Fable, hyväksytty)**: kaupunkilehti (kansi, aihesivut,
nostot, mediarivi, Lue lisää) → matkakirjakortti auki/kiinni →
linssien UI (palkki, karuselli, selite) → sähke → noppa/siirtolista →
kulkutapaliuska → kauppa/linssien hankinta → passi → asetukset →
loput (~40 näkymää yhteensä, ks. Fablen alkuperäinen lista).

**Tunnukset yhtenäistetty Natiivi-UI:n kanssa**: kaupunki Ateena
(kaupunkilehti/chat/linssit), maa GRC/Kreikka (maalehti),
matkakirjakortille Tanger.

**Työkalu**: `tools/pariteetti-web-kuva.mjs` — Chromium
`--use-angle=metal` (PAKOLLINEN, ilman sitä etusivun pallo/otsikko ei
koskaan valmistu Playwrightissa, ks. alla), pienennetty JPEG
(levytila tiukka, ~12 Gt vapaana). Kuvat EIVÄT ole repossa — Macin
scratchpadissa `.../pariteetti/<laite>/<web|natiivi>/`.

**ODOTTAA Pelikoodarilta**: kysyin kehittäjäoikotietä introtekstin
ohitukseen (jokainen näkymä vaatii muuten ~30–40 s klikkailua/odotusta
typewriter-tekstin läpi) — ei vastausta vielä kun luovutin. Kysy
uudelleen tai kokeile itse ensin.

**Tunnettu este, jo kirjattu Pelikoodarille**: etusivun otsikko-H2
(`.intro-juliste`, luokka `avaus-kesken`) jää opacity:0-tilaan yli
15 s Chromium+Metal-GPU:llakin — Fablen kriteerin mukaan aito löydös,
ei automaatioeste. Etusivun rivi (#1) taulussa on siksi merkitty
ODOTTAA. Näkymä #2 (aloitusvalinta) PASS rakenteellisesti, mutta
löysin eron: web korostaa valittavat kaupungit kultaisella
hehkurenkaalla, natiivissa pelkkä piste — kirjattava Natiivi-UI:lle
kun batch 1 on koossa.

**Seuraavalle sessiolle**: 1) kysy Pelikoodarilta oikotie (tai käytä
klikkaus+pitkä odotus -menetelmää, ks. työkalun kommentit), 2) jatka
web-kuvia Fablen järjestyksessä, 3) lähetä 10 näkymän erät Natiivi-
UI:lle ja Fablelle, 4) yksi "riittävän hyvä" kuva per näkymä, EI
debug-kierroksia (Fablen ohje) — jos jokin näyttää selvästi rikkinäi-
seltä, kirjaa se ja jatka, älä jää kiinni yhteen näkymään.

## B7 kuulokoe: 12/13 kohtaa käyty (Pelikoodarin ohjeilla)

PASS: 1 (intron duck/palautus, selvitetty tarkasti — 0,150-suhde ja
1,8 s ramp-kesto oikein), 2 (avauslento), 3 EI VIELÄ (mannerlento,
`koetila mannerlento` → tuntematon komento, odottaa
pelikoodari/koetila-mergeä Natiiviseppältä), 4 (laiva ja jalan/maa),
5 (kysymys), 6 (aarteen paljastus), 7 (lehti), 8 (linssit), 9
(tausta/takaisin), 10 (kompressori), 13 (levyvälimuisti, ei kasvua).

**Auki**: kohta 3 (mannerlento, odottaa koetila-mergeä — komento
valmiina: `uusi-peli 1 lissabon` / `odota-tila Kartta` / `koetila
mannerlento` / `mannerlennot` / `rivi <n>`, ks. Pelikoodarin viesti),
11 (sanelu) ja 12 (äänettömyys/Bluetooth) vaativat fyysisen laitteen —
omistajan iPad-listalle Fablen mukaan, ei simulaattorilla
testattavissa. Raportti `docs/raportit/b7-kuulokoe-tulos-20260924.md`,
PR #3023 (haara laitetestaaja-b7-raportti) — vielä auki, tarkista onko
mergetty.

## iPad A/C-sarja: valmis tältä osin

A1–A9 (paitsi A8 sanelu, vaatii fyysisen laitteen), kosketusala-
korjaus vahvistettu toimivaksi (natiivi-ui/kosketusala-3), A5/A6/A7
kaikki PASS lopulta. Virtanappien pikselitarkistus (`ihminen
tutkimus`-komento) odottaa yhä linssiseppa/ihminen-tutkimus +
natiivi-ui/tutkimus-esittely -mergeä — tarkista onko asentunut.

## Opittua

- Chromium tarvitsee `--use-angle=metal` GPU-piirtoon Playwrightissa
  tällä koneella — muuten WebGL-riippuvaiset animaatiot (pallo) eivät
  koskaan valmistu, jopa headed-tilassa.
- Levytila on tiukka (~12 Gt) — käytä pienennettyjä JPEG-pareja, älä
  täysikokoisia PNG-kuvia joka näkymästä, äläkä committoi kuvia repoon.
- `simctl launch` samalle bundle id:lle EI käynnistä uudelleen jos
  prosessi on jo käynnissä (sama PID) — hyvä tausta/etuala-testeihin,
  mutta jos tarvitset AIDON kylmän käynnistyksen (esim. etusivun
  kuvaan), käytä ensin `simctl terminate`.
- iOS-simulaattorin `ui`/`peli`/`linssi`-komennot ovat huomattavasti
  luotettavampia kuin koordinaattinapautukset — käytä `ui napauta x y`
  (diagnostiikka kertoo mihin osui) aina kun mahdollista.
