# Juna 153 savu b9f09bcd (app 7920e6a0) — OK, Kysy-kysymyksen napautus ja kaupunkikierros todentamatta (20.36–20.46, iPhone-sim 1572C658, mykkä)

TODISTUS.md: `/Users/Shared/Claude/proto-3d/lokit/todistus-juna153-{a-20261006-2036,b-20261006-2040,c-20261006-2043}/` (kopiot repossa `todistus-juna153-7920e6a0-{a,b,c}-20261006.md`). LS1 rinnalla. **0 Exception, 0 VIRHE-riviä, 0 kaatumista**, ei 429-virheitä. Testimykistys natiivi päällä.

**TULOS 153 (b9f09bcd, app 7920e6a0): OK — kylmäkäynnistys, kartta, ISS-ohjaamo + jalka, opas aloitusvalikosta (Sydneyn oopperatalo), Liiku-paneeli, Kysy-paneeli ja Poistu → kartta ehjänä; 0 Exception, 0 kaatumista; Kysy-kysymyksen napautus ja Kaupunkikierros todentamatta.**

| Kohta | Tulos |
|---|---|
| Kylmäkäynnistys → kartta (Liiku näkyy), mykistys, asetukset datana | OK (ajo a; `peli aani mykistys` → "unity päällä, natiivi päällä") |
| ISS-ohjaamo + **jalka** | OK: Cupola-näkymä, LCD "COOS BAY / YHDYSVALLAT", kiihdytys, LAAJA/TELE, kamera, suunta-joystick, astronautti-Pulu; **jalka/tukijalka** näkyy ohjaamon alapaneelin alla ja robottivarsi oikealla (`juna153-7920e6a0-iss-jalka.png`) |
| Kartta ISS:n jälkeen | OK |
| Opas aloitusvalikosta oikealla napautuksella | OK: `tap-teksti Sydneyn oopperatalo` → `opas: täky valittu Sydneyn oopperatalo (Sydney, AU)`; ääni `aani mittaa` rms **0,127** huippu 0,646 `[opas-pcm]` |
| Opas Sydneyssä | OK: Sydneyn oopperatalo 3D, kuva-inset "+7", Kysy/Liiku/mikki/näppäimistö, ⏸ ja ≡, **uusi "kuu + A" -nappi** (päivä/yö-automaatti) vasemmassa yläkulmassa; Google Maps -krediitti (`…-opas-sydney.png`) |
| **Liiku-paneeli** | **OK**: oikean yläkulman "MIHIN SIIRRYTÄÄN?" 12 kohdetta (Sydneyn oopperatalo, Sydney Harbour Bridge, Sydneyn satama, Bondi Beach, The Rocks, Circular Quay, Royal Botanic Gardens, Darling Harbour, Sydney Tower, Queen Victoria Building, Hyde Park …); loki `opas: liiku-lista 12 (Sydney…, ok)`; kohteen valinta toimi (`opas: liiku Hyde Park`, `kysymykset 6 (Hyde Park)`) (`…-liiku-paneeli.png`) |
| **Kaupunkikierros** (kiinnitetty alimmaksi) | EI TODENNETTU: rivi `Kaupunkikierros` välähti lokissa (`välähdys … "Kaupunkikierros"`), mutta ui-puu ei antanut sen koordinaattia (lista vierittyy) → ei napautusta/käynnistystä |
| **Kysy-paneeli** | OSITTAIN OK: avautuu, "KYSY OPPAALTA" + 6 Sydney-kysymystä (Kuka suunnitteli Sydneyn oopperatalon? …); loki `opas: kysymykset 6`. **Kysymyksen napautus ja `opas: kysy` -lokirivi EI TODENNETTU** (ajossa b Liiku-paneeli oli auki; ajossa c sovellus ehti sulkeutua ennen jälkikäteistä tappia) |
| Poistu linssistä → kartta ehjänä | OK (`…-kartta-oppaan-jalkeen.png`) |
| Ei testattu | noston ylärivi ja krediitit nostokortissa, Google-krediitin kapea ruutu, musta aloitusruutu → logo erikseen (kylmäkäynnistys ohitettiin `uusi-peli`-komennolla), kuu-A-napin toiminta |
