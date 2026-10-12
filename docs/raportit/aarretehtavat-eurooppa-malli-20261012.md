# Aarretehtävät Eurooppa: mallierä (Praha, Rooma, Helsinki, Tallinna, Bern), 12.10.2026

PT:n päätös 12.10.: mallierä viidelle kaupungille. Sisältö koneluettavana: `aarretehtavat-eurooppa-malli-20261012.json`; faktaliite: `aarretehtavat-eurooppa-malli-faktat-20261012.md`. 9 tehtävää (Bernillä yksi). Uudet lajit (valinta, kartta, etsi_kartalta) odottavat Pelikoodarin moottoria.

| Kaupunki · henkilö | a | b |
|---|---|---|
| **Praha** · Lyhdynsytyttäjä Tomáš (Kultaisen kujan talo) | Katso: Petřínin näkötorni | Arvio: Kaarlensillan pituus (520 m, väli 480–550) |
| **Rooma** · Pasunisti Nico (soittaa iltakeikkoja kaupungin juhlissa) | Katso: Pantheon | Aikajana: Colosseum → Pietarinkirkko → Rooma pääkaupunki |
| **Helsinki** · Luotsi Aino, laivaluotsi | Katso: Uspenskin katedraali | Kartta (CC0, 1860): tähtitorni |
| **Tallinna** · Opas Leena (opas) | Etsi kartalta: Olevisten kirkko | Valinta + ääni: marsipaani (isoisän luenta) |
| **Bern** · Leipuri Ruth Zbinden | Etsi kartalta: Bärengraben ja BärenPark | – |

## Maan aarrevihjeet (3 tehtävää/maa → kaupunki merkitään kartalle)

| Maa | Aarre (paikallisaarteet.js) | Kaupunki | Rivejä |
|---|---|---|---|
| CZE | Rudolf II:n kabinetin helmi | Praha | 2 |
| ITA | Caravaggion kadonnut maalaus | Sisilia (Palermo) | 3 |
| FIN | Ivalojoen kultahippu | Lappi | 3 |
| EST | Hansakauppiaan hopeakätkö | Tallinna | 2 |
| CHE | Wilhelm Tellin varsijousi (taru) | Alpit | 3 |

## PT:lle päätettävää

1. **Bern/CHE (PT päätti 12.10.):** vihjekaupunki Alpit, Grindelwaldia ei nimetä; rivit sanovat taru.
2. **FIN-aarteen fakta on väärä** (`paikallisaarteet.js`: "huippuvuonna 1871 yli 50 kg"; lähteiden mukaan 10,4 kg): korjaus erillisenä PR:nä (tehty).
3. **Praha:** saapumispiste siirretty Kultaiselle kujalle (50.0921, 14.4043).
4. **Helsingin karttatehtävä:** kosketustoleranssi 70 px (1920 px leveässä kuvassa); Pelikoodari tarkistaa mittakaavan näytöllä.
