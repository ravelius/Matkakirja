# Laitetestaajan lyhyt luovutus (28.9.2026 klo 00.4x, tilinvaihtoa varten)

## Tila juuri nyt

BUILD 34 (proto-master 17c2928b, tag build34) puhe-PASS ajettu ja raportoitu Julkaisijalle,
Fablelle, Natiivisepälle. **PASS pääkohdista 1-3** (kappalejako [pause], tagit piilossa näkyvästä
tekstistä, luenta ilman ohituksia, 0 poikkeusta). Julkaisija vie TF 1.0.34:n SHA:lla 17c2928b.
`docs/raportit/savukierros-build34-puhetagit-20260928.md`.

## AVOIN TARKISTUS tilinvaihdon jälkeen (Fable 28.9. klo 00.4x)

Kohdat 4-5 EIVÄT TODENNETTU BUILD 34:n puhe-PASS-kierroksella — ei löydös, vain testaamatta:

4. **Väliotsikon eteen [long-pause]:** testiartikkelissa (`ui nosto
   skandaali:shakkiturkkilainen`) ei ollut mid-artikkelin väliotsikkoa. Tarvitaan artikkeli
   JOSSA on väliotsikko keskellä tekstiä (tarkista sisältöpaketista/kysy Pelikoodarilta/
   Sisältökirjurilta sopiva nosto-id) — avaa se, lue läpi väliotsikon kohdalle asti, tarkista
   `puhe:`-lokirivistä ilmestyykö `[long-pause]` juuri väliotsikon EDELLÄ.
5. **Pulun "pollo"-persoonatagi:** `ui pulu sano` (käyttää valmiiksi säilöttyä Livia-tekstiä,
   ei uutta xAI-kulutusta) palautti aina "→ ok" mutta EI KOSKAAN tuottanut näkyvää
   `puhe: alkoi ... pollo||...`-riviä lokissa — kokeiltu kesken kertojan luvun, sen jälkeen, ja
   `puhe pois`/`aanet`-tiloissa, kaikki turhaan. Epäily: `pulu.Nakyvissa`-ehto tai vaatii jonkin
   toisen UI-tilan (esim. `ui chat` auki, EI kuitenkaan uutta kysymystä — xAI-kulutusraja).
   Kokeile ensin: onko Pulu-hahmo näkyvissä ruudulla juuri komennon hetkellä (`ui puu` tai
   kuvakaappaus) — jos ei, selvitä mikä näkymä tuo sen esiin ilman uutta chat-kysymystä.

## YÖTAUKO jatkuu (Fable, alkoi 27.9. klo 22.30, poikkeuksena BUILD 34 valmis)

Simulaattorit (1572C658, 3B4CDACB, C1D5E34C, 993F8873) sammutettu UDID:llä BUILD 34 -ajon
jälkeen (muista sammuttaa jos et jo). Ei ajoja Karttasepän polton ajan — odota Fablen kutsua.

## Muistettavaa

- **xAI-kulutusraja**: säilötyt tekstit + oletusääni, ≤5000 mrk/vrk per rooli. `ui pulu sano`
  (oletusteksti), `ui livia avaus`, `ui offline avaus/lataa` EIVÄT kuluta xAI:ta — vain
  `ui chat <uniikki kysymys>` / `puhe lue <uniikki teksti>` synteesoi uutta.
- **Konsolit**: `peli-komento.txt` (peli), `ui-komento.txt` (UI), `linssi-komento.txt` (linssit),
  `komento.txt` (kamera/maasto/**alue lataa/tila** — EI peli-komento.txt:ssä, sudenkuoppa).
- Fable/Natiiviseppä/Julkaisija: tarkista id ListAgents-listasta — vaihtuu tilinvaihdossa.
- Peer-viestien ~10/vuoro-raja: varakanava `mcp__ccd_session_mgmt__send_message`.
- Kaikki komennot/sudenkuopat: `docs/raportit/laitetestaaja-reseptit.md`.
