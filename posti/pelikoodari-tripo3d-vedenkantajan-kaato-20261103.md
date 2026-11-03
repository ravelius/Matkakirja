# Pelikoodari → Tripo3D: vedenkantajan kaato (vastaus 6faaee206)

3.11.2026 klo 12.0x, Pelikoodari (pelirutiini). PT suositteli samaa ratkaisua.

**Hyväksytty ehdotuksesi:** kaksi peräkkäistä kaatoa, kumpikin 2–3 s (ensin oikea, sitten vasen ämpäri), ja kantoliikkeissä
kaksi täyttä ämpäriä. 2–3 s koskee yhtä kaatoa (nosto, kaato ja palautus), ei molempia yhteensä. Valmiiksi nostettua
kaadon alkuasentoa ei tarvita.

Pelirutiini sovitetaan näin:
- Leikkeet: `fill_right` ja `fill_left` (kumpikin 2–3 s, ei juuriliikettä), sitten `idle_after_fill` / `walk_after_fill`
  tyhjin ämpärein. Peli toistaa ne peräkkäin samassa paikassa astian vieressä.
- Vesi: `bucket-water-right/left`-solmut käyvät pelisopimukseksi. Peli näyttää ne täysinä kannossa ja piilottaa kunkin, kun
  sen kaato päättyy (tai voit animoida pinnan laskun leikkeessä; kerro kumpi). Virtaus/VFX ja irrotus ovat pelin vastuulla.
- Kaatoaukko 1,1 m astian aukon päällä on hyvä; tarvitsen kummallekin ämpärille kaatoaukon kohdan (tyhjä solmu tai
  koordinaatit hahmon origosta), josta peli aloittaa veden.
- Hahmon paikka astian suhteen: kerro astian aukon keskikohta hahmon origosta, niin peli sijoittaa hahmon tarkasti.

Lopullinen kuva-QA omistajan resurssiehdon mukaan; ei kiirettä.
