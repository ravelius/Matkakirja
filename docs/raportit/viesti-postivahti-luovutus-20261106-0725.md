# Postivahti-luovutus 6.11. 07.25 (korvaa -0258:n)

Sääntö: aloitusviesti roolille vasta kun sen mcp__ccd_session_mgmt__list_events = 0 (idle, 0 viestiä); aikainen viesti estää nollauksen. SendMessage pysähtyy ~10–12 viestiin: käytä mcp__ccd_session_mgmt__send_message (ToolSearch). Remote Controlia EI kytketä muille (KK kytkee itse). Nollauspyyntö roolille (7.37) = viesti "nollaa itsesi (clear_session self) tämän vuoron lopuksi". Rooli, joka ei nollaa itseään ja seisoo idlenä: pyydä uudelleen.

## Odottavat aloitusviestit
- Natiivi-UI local_a3754ed8-f155-43b5-9095-b51e9e29ff53: 5da179a19, haara natiivi-ui/luovutus-20261106-0710 (lue -0710, LISÄYS 07.2x, sitten -0225). Lisää: PT:n testikuva puut-ylhaalta.png (viesti saattoi jäädä luovutuksen ulkopuolelle). KK:n ja VS:n vastaukset odottavat. Nollauspyyntö lähetty, ei vielä nollattu.
- Karttaseppä local_ddd980b0-2760-4c5d-a0c8-d65ad1ecb757: -0711, haara karttaseppa/luovutus-20261106-0711 (kärki 844b95c58). Aloitusviesti lähetetty jonoon 07.2x (sessio nollattu, 70 viestiä, työssä); varmista että luki.
- Valoseppä local_3b36fe96-0199-4b17-9eb4-46a882ce7399: luovutus -0702 (origin linssiseppa2/luovutus-20261106-0702). Aloitusviesti toimitettu; PT-lisäys jonossa: NUI pyysi ohjelmakohteiden rekisteröinnin nimien väistöön (merkki-pinta-219 e7e8d7b5b) ennen Pompidouta.

## Päivitys 07.4x (PT:n luvalla nollaan itseni tämän jälkeen)
- JONO SEURAAJALLE: (1) VS local_3b36fe96-0199-4b17-9eb4-46a882ce7399: luovutus 471cd2e6d, origin linssiseppa2/luovutus-20261106-0716 (korvaa -0702:n). Aloitusviesti kun list_events = 0 (nollaa itsensä, ei vielä nollattu 07.4x, 672 viestiä). Lisää viestiin: (a) nimien tiedot ja rekisteröinti NUI:lle (e7e8d7b5b:n väistö odottaa), (b) maan arvot KS:ltä ennen korkeuksien lukitsemista, (c) työ Saint-Eustache ja Saint-Sulpice, sitten Pompidou KK:n järjestyksen mukaan siltojen jälkeen; jos luovutus sanoo toisin, varmista KK:lta. (2) PK local_601d33fc-1c61-4ccd-8389-fa425417fafb: luovutus 72b22e590, docs/raportit/viesti-pelikoodari-luovutus-20261106-0716.md, haara koti/Matkakirja-pelikoodari; ensimmäinen työ kameran selvitys kohta 2. Nollauspyyntö lähetty 07.4x, ei vielä nollattu.
- VS-nollauksen tulos (PT:n kysymys): VS nollattiin 06.5x (list_events 0, aloitusviesti -0702 toimitettu), sen jälkeen uusi luovutus -0716 samassa kontekstissa; 586 viestiä oli vanha sessio ennen -0716-nollausta.
- LAV 47a1ff4ff (-0715) ja NUI 5da179a19 toimitettu 07.3x; NS 8ee497cdb työssä; KS -0711 työssä.

## Toimitettu aamulla
JU local_b4a7e82a-2522-437f-84ff-813401120931 dd6a5740d (-0651); NS local_c7344e20-fba8-433d-ba8e-184a325037ef 8ee497cdb (-0705); LAV local_beb68834-6c4f-4839-ac75-7876b45052c3 561e3b313 (-0218); KK local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe; PK local_601d33fc-1c61-4ccd-8389-fa425417fafb dff2fd6c1; PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc b46cc831b (nollattu ja työssä).
