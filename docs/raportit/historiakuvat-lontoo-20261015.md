# Lontoon historiaosiot ja niiden kuvat (Sisältökirjuri 15.10.2026)

PT:n erä 15.10.: Lontoon historiatekstit (opas/historia-v1/lontoo.json -pohja) samalla mallilla kuin Praha ja Ateena, faktantarkistettuina, sitten historiakuvat.

## Tekstit
- `docs/kohtaukset/pallokierros/lontoo-historia-20261015.json`: 8 osiota (43–56 sanaa, kesto_s = sanat × 0,70), tunnukset lontoo-historia-{ruutisalaliitto, tuntematon-sotilas, blitz-palatsi, trafalgar, suuri-palo, kruunuvarkaus, suuri-loyhka, harrison}. Aiheet eivät toista pysäkkikerrontaa (lontoo-kerronta-20261012.json).
- Faktaliite `lontoo-historia-faktat-20261015.md` ja muutokset `lontoo-historia-muutokset-20261015.md`. Kaksi kierrosta: kirjoittaja-agentti (kaksi lähdettä per väite) ja riippumaton Sonnet-tarkistaja (48 väitettä: 39 OK, 9 korjattu, 0 pudotettu). Tärkeimmät korjaukset: tuntematon sotilas valittiin Ranskan JA Belgian taistelualueilta (Ypres); "pituuspiiri" → "pituusaste" (Harrison); Trafalgarin antautuneet "ainakin 17"; kruunuvarkaus: kiinniottopaikkaa ei väitetä; suuri palo: jalat + metrit.
- Tunnetut lähderistiriidat, jotka teksti ohittaa: suuren palon kuolleet (alle kymmenen kirjattua; History.com 16), viemäriverkoston valmistumisvuosi (1875; Science Museum 1865).
- Ääntä ei ole tehty; äänitys vasta omistajan luvalla.

## Kuvat (15 kuvaa, kaikki PD tai CC0; ei CC BY -kuvia, ei tekijämainintoja)
Vienti Julkaisijalle: `/Users/Shared/Claude/proto-3d/_valmiit/historiakuvat-lontoo-vienti-20261015/` (esittely/lontoo-historia-v1/, LAHTEET.md, SHA256SUMS). Riippumaton Sonnet-tarkistus: 11 OK, 4 HEIKKO; kaikki korjattu (ruutisalaliitto: Fawkesin pidätyksen puupiirros, rajattu; suuri löyhkä: Abbey Millsin tilalle Lontoon viemäriverkoston kartta 1882; tuntemattoman sotilaan ja Harrisonin kuvatekstit tarkennettu; "alakannella", Salisbury).
- Heikoin kohta: Harrisonin H4-kuva on kirjan 1767 koneistopiirros (595 px), koska H4:stä ei löytynyt vapaata valokuvaa.
- Kruunuvarkaus: vain 1 kuva (Briggsin maalaus 1824); aikalaiskaiverrusta ei löytynyt.
- Koodi: tools/pollo/aineistot.js historia_yksityiskohdat_polut on lisättävä Lontoolle (esittely/lontoo-historia-v1/lontoo-historia-yksityiskohdat.json), kuten Praha, Ateena ja Kööpenhamina (Julkaisija).
