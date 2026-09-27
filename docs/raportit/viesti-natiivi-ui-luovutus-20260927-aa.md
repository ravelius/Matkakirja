# Natiivi-UI:n luovutus 27.9.2026 (aa), TAUKO + TILINVAIHTO klo 23.5x

Jatkaa luovutusta (z). Fable = local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. Omistaja 23.58: muut työt tauolla (vain
striimiluenta julkaistaan), sitten tilinvaihto. Oma simulaattori iPhone 17 FB234D08 SAMMUTETTU (Fablen pyyntö, yöpoltto).
Proto-worktreet (katto 3): wt/proto-natiivi-ui-{vieritys,sisallys,pariteetti}. Aineisto: proto-3d/lokit/natiivi-ui-1033/.
Apuskriptit tämän session scratchpadissa (/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/
1f28cb46-73ca-4054-b71e-ab9434c203f7/scratchpad/): k.sh (i|p ui/peli/kartta/kuva), ateena-video.sh (Ateena + kamerakäsikirjoitus
+ video), valky.py (ruutujen väliset muutokset 30 fps), c1-kuvat.sh + c1-vertaa.py (kuusi näkymää ja pikseliero), savelkorkeus.py
(puheen f0), pari.py/nimio.py (kuvaparit nimiöin). Kopioi talteen ennen /tmp-siivousta.

## VALMIS (1.0.33, todennettu juna 5eef5138:lla; ENNEN = _valmiit/juna-4be1a696 = 1.0.32)
- Kuvakortti-vakaa 6f1ec96c: Ateenan kortti hyppäsi 1.0.32:ssa loitonnuksen jälkeen EGEANMEREN päälle; junassa pysyy.
  Levossa ei muutoksia kummassakaan (Livian ulkopuolella). kuvakortti-pari-30s.png, kuvakortti-ennen-jalkeen.mp4.
- Äänivalitsin 1b47f46e: 1.0.32 sulki paneelin ilman valintaa; junassa valinta tallentuu. xAI-ääni kuuluu: sama otsikko
  altair 104 Hz vs ara 190 Hz, soitto rms 0,096. Kulutus 9 palaa ≈ 2 500 mrk. aanivalitsin-pari.png, aani-ennen/jalkeen.mp4.
- C1 015fdb8e PUDOTETTU: mk-lukija-nappien kosketusala kasvatti nostokortin rattaan ja kaiuttimen ikonia 0,33 pt (1 px)
  (c1-ero-ratas-kaiutin.png; ui-puu 20,3→20,7). Muut näkymät: erot vain muista muutoksista (400 £, kuvakortti, laskuri).
  natiivi-ui/c1-pois 31daba91 on JUNASSA (508761e8), mutta viimeisin käännös 235e034e (22.43) EI sisällä sitä.

## AVOINNA
1) Kun juna käännetään c1-poisin kanssa: nostokortin otsakkeen vertailu uudelleen (lokit/natiivi-ui-1033/c0.png = 1.0.32,
   rajaus 940,230–1150,310 px; odotus 0 px ero). `ui nosto skandaali:shakkiturkkilainen lisaa`.
2) FB234D08:n lukijan ääni jäi Aarneksi (altair) → palauta Aino (oletus) ratas-paneelista ennen puhetestejä.
3) natiivi-ui/nimet-laskuri 5d79edd9 (Natiivisepän pyyntö: LaatikkoMuutoksia `nimet`-rivillä, kasvaako levossa → Samat-
   toleranssi). Ehdotettu 1.0.34:ään, ei junassa. tarkista.sh 0 virhettä.
4) JONO 1.0.34 (Fable 22.5x): "Koe ihme" -nappi pois; ihmekuva kortin ensimmäiseksi isoksi kuvaksi, valokuva pienenä tekstin
   kylkeen. Odota Pelikoodarin web-speksiä ja kuvaparia → natiivi samaksi.

## OPIT
- MCP-simulaattorin screenshot näyttää EDELLISEN tilan (Unity piirtää vain herätettynä) → käytä `xcrun simctl io screenshot`.
- ui-komento.txt vaatii "ui "-etuliitteen (k.sh i ui "ui aloita ateena").
- Karttakomennot nipistys/veto (komento.txt) antavat toistettavan kameraliikkeen ennen/jälkeen-videoihin.
- Unityn Debug.Log ei näy `log show`:ssa; puheen tarkistus verkko-odotus.jsonl + Documents/aani/<sha256(avain)>.mp3.
