# Juna 142 lukijapaneeli, oikeat napautukset, 5.10.2026 klo 02.2x

Laitetestaaja. iPhone 18 Pro 1572C658. Build Matkakirja3D-1fbbad7b.app (Pelikoodari). 0 Exception / 0 virhe-riviä.
Lokit: `docs/raportit/kuvat/peli-loki-142b.txt`.

## Tulokset

1) Nostokortti: kaiutin käynnistää luennan — OK. Lokissa `puhe: alkoi`, nostokortti Pompeji auki alhaalla.
2) Ääni ›/‹ — OK (›): lokissa `ui lukija: ääni Aamu` ja `ääni vaihtui, pala 1/2 uudella äänellä`. Kuvassa nimi "Aamu".
   ‹-nappia ei testattu erikseen.
3) Äänen nimi avaa listan paneeliin — OK: lista aukesi, valinta Kerttu sulki listan ja vaihtoi nimen. Lokissa `ääni Kerttu`,
   sitten `aloita pala 1/2`.
4) Napautus paneelin ulkopuolelle kortin sisällä — OK: paneeli sulkeutui, nostokortti jäi auki (kuva).
5) ≡ avaa paneelin, napautus kartalle — OK: paneeli sulkeutui, kortti jäi auki (kuva).

Huomio: iPhonella koordinaatit olivat eri kuin iPadilla (≡ (323,483), kuvan napautus (39,640), kartta (200,200)).
Kohdan 2 ‹-napin toimintaa ja kohdan 3 "luenta alkaa alusta" -väitettä (loki näyttää uuden palan alun, ei varsinaista kohdistusta) en varmistanut.
