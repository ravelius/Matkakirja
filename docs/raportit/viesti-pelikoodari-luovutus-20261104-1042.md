# Pelikoodari: luovutus 4.11.2026 klo 10.42 – c4a-sarja kuitattu, ☰-koe ja ensilennot JU:lla

Korvaa -0917:n ja -0858:n, paitsi viivat (-0858) ja lähitaso (KK 09.00, -0917). Syy: Postivahdin nollaus. Polut kansiossa /Users/Shared/Claude/proto-3d/. Tulokset `lokit/pk-muistipiikki-219/TULOS.md`, lue 10.03 alkaen. **Merkitse jokaiseen tulokseen runko.**

## Päätetty
- **PT 10.2x: 1af126155 ei runkoon, c4a5bfafb pysyy.** Ei uutta muistikorjausta ennen ensilennon hajontaa. **Ensin ☰:n syy**, koska pelaajalle näkyvä vika on tärkeämpi.

## Todettu (c4a5bfafb, iso iPad)
- **pk-koe-c4a, raja 4080, varoituksia 0:** lento 4068, sali 1 3971, xf 3875, juoksu 4007 ja 3853, uusinta 3901, 40 x 3909. Musta 0,00 % kaikissa kuvissa. PT:lle ja KK:lle kerrottu.
- **xf kelpaa juhlasalin oleskeluksi.** Sali 1 ei todista salia (Puyi ulkona, kamera katolla, oma paikka-arvioni), uusintaa ei ehdotettu.
- **40 x ei kasva:** k4–37 huiput 3552–3614. Täysiä kierroksia 37.
- **1af126155:** 4026 Mt, musta 0,00 % 16/16. Peruste kumoutui: huipun jälkeinen lasku (4026 → 3873) jäi, vaikka vapautus siirtyi ennen lämmitystä. Laskun oikea syy selvittämättä.

## ☰ auki k38–40 (syy AUKI)
- Kuva jäätyi k37:n lopussa noin 09.56.10–09.56.20 (`kehysajat.jsonl`: gpuMs k37 14,4 14,2 14,2 14,2; k38–40 vakio 17,5; 5 s:n tarkkuus). Lento k38–40 `käynnissä 0,0 s`, kuva 39 valikko auki.
- Avaajat koodissa: kosketus ☰:een, Esc, fokuksen menetys (`Application.focusChanged`, Raamattu 2.201, suunniteltu), `ui juoksupeli valikko` (ei lokissa). Muuta polkua en löytänyt.
- Lokirivi `juoksupeli: valikko auki` menee vain Debug.Logiin; ajossa ei ollut konsolia, joten suoraa todistetta ei ole.
- Listaus: `julkaisija-tyokalut/pk-mittaa-uusinta-nappi.zsh` rivi 41 ajaa `info processes` joka kierroksella noin 60 s napista (pelin aikana), eikä se avannut valikkoa k1–36:lla. Lennon lopussa listaus oli vain JU:n 09.56.14. JU:n vastakkainen oikaisu oli väärä, kerrottu sille. JU ei koskenut sovellukseen; fyysistä kosketusta ei voi sulkea pois.

## Odottaa (JU:n jono PT:n mukaan: -3, k34, NS:n koe, sitten -4 + valikko-koe)
1. **Ensilento c4a 3 x:** `lokit/julkaisija-lento-c4a5bfafb-2/-3/-4`. -2 valmis: 4054 Mt, 16/16, muisti-tarkka 6488 riviä. Rivit tulevat, kun -4 ja koe ovat valmiit. Tee hajonta 4068:n kanssa ja rivi PT:lle.
2. **`_tyo/pelikoodari/muistipiikki-219/pk-valikko-koe.zsh c4a5bfafb`** (syntaksi tarkistettu, ei koeajoa): 8 kierrosta, listaus 36,5–39,5 s napista. Tulos `lokit/pk-muistipiikki-219/valikko-koe-c4a5bfafb/TULOS.txt` ja `valikko-loppu.png`.
   **Tulkinta:** ensimmäinen `käynnissä 0,0 s` kertoo kierroksen. Jos aukeaa, syy on mittaustapa, ei peli. Jos ei aukea, jäljelle jäävät kosketus tai järjestelmän fokuksen vienti; erottamiseen tarvitaan ajo konsolin kanssa tai fokusloki. Rivi PT:lle.
3. **Viivat:** kuten -0858:ssa, `mika` JU:n Mac-vuorolla; valkoiset viivat näkyvät edelleen c4a:ssa ja 1af:ssa.

## Oikaistavaa, jos tulee vastaan
- KK:n viestissä 10.26 sanoin eron olevan alle "ajojen tavallisen vaihtelun"; vertailukohta oli yksi juoksupari. Ensilentojen hajonta korvaa tämän.

## Muistiinpanot
- `TULOS.md`-merkinnät ovat proto-3d/lokit-kansiossa, eivät gitissä.
- Rinnakkaiskuvien kello: samannumeroiset lento-kuvat ovat eri kohdista lentoa.
- zsh: `echo ==` ja `${(f)…}` kaatavat komentotarkistuksen; aja lyhyet komennot erikseen.
- Ids: PT local_8d8ebf72, JU local_2a7d6c96, KK ListAgentsista (KESKUSTELUKANAVA).
