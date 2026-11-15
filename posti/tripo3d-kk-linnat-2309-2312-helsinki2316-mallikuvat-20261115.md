# Tripo3D → KK/PT: kolme linnakuvaa ja Helsinki v2 (15.11.2026)

Tilaukset #2309/#2311/#2312/#2316: kustakin yksi kokonaan uusi ImageGen-mallikuva alkuperäisistä koontikuvista, natiivit T7:llä. Tässä ≤1000 px tarkistuskuvat ja QA; ei Tripoa tai automaattisia uusintoja.

Kansio: `posti/codex-linnat-2309-2312-helsinki2316-mallikuvat-20261115/`.

- **Caernarfon #2309 — FAIL:** avoin piha ja kolme Eagle Towerin pikkutorniaihetta näkyvät, mutta tornien hahmo pyöristyi liikaa kulmikkaisiin lähteisiin nähden. Pohjoismuurin peittyvät liitokset ja pihan rauniot jäävät lisäksi arvioiksi.
- **Häme #2311 — WARNING:** päälinna, alempi kehä ja kaksi tykkitornia mukana ilman ulkotaloja tai vallia. Kehän täsmällinen pohja, korostunut harmaakivivyöhyke ja peittyvän sisäpihan muodot jäävät arvioiksi.
- **Kuressaare #2312 — FAIL:** tunnistettavan pohjoisen porttiseinän tornijärjestys on lähderuutuun1 nähden käänteinen, joten tilattua NE-näkymää ei hyväksytä. Kuvasta ei yksin eroteta koko kuvan peilausta tornien/seinäosien väärästä sijoittelusta. Katto ja piha jäävät lähteissä avoimiksi.
- **Helsinki1907 v2 #2316 — WARNING:** kolmikerroksinen keskiosa ja pyöreä päätyikkuna, matalat kaksikerroksiset välisiivet sekä korkeammat päätypaviljongit erottuvat nyt. Vasemmalla näkyvä katos voi olla pitkän ratapihanpuoleisen katoksen pää; koko takasivun jatkuvuus ei tästä kamerasta varmennu. Ei väitettä varmasti väärästä päätykatoksesta.

Kuvat ovat KK:n arvioon. Caernarfonin ja Kuressaaren virheet estävät minun QA-hyväksyntäni; yksi sallittu kutsu on käytetty. Jos tarvitaan korjaus, pyydän KK:lta uuden rajatun ohjeen. Häme/Helsinki eivät saa Tripo-lupaa tämän toimituksen perusteella.

Natiivit ja promptit:
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/linnat-2309-2312-20261115/` — kohdekansiot `caernarfonin-linna`, `hame`, `kuressaare`, kussakin `<slug>-model-v1.png`, `imagegenprompt.txt`, `QA.md`.
- `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/kadonneet-ryhma4-20261115/helsingin-vanha-rautatieasema/retry-2316/` — `helsingin-vanha-rautatieasema-model-v2.png`, `imagegenprompt.txt`, `QA.md`.

SHA256:t, artifactId:t, lähde-SHA:t ja ajat manifestissa. Palvelu ei näyttänyt rahakustannusta. Built-in ImageGen, neljä kutsua yhteensä, natiivit säilytetty. Krediittejä kuluttavat kolme hyväksyttyä ryhmän4 Tripo-ottoa ovat erillisessä erässä #2313–2315 ja niiden mallit/toimitus käsitellään erikseen. Kevennystä tai pelikuvia ei aloitettu.
