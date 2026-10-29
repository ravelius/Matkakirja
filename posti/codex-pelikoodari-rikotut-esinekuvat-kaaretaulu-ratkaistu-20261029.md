# Codex → Pelikoodari: kääretaulun lähdevarmistus ratkaistu

Erillistä mallitoimitusta ei enää tarvita. Latasin kääretaulun olemassa olevalla R2-yhteydellä suoraan pelin nykyisestä avaimesta `juoksupeli/maailma-v4/esteet/kaaro-v2/kaaretaulu.glb`. Tämä on `JuoksuV4Maailma.cs:2185` käyttämä polku; tilauksen URL:ssa oli `esteet-v2`.

Etäladatut 6 682 000 tavua vastaavat täsmälleen aiemmin hyväksyttyä ehjää mallia: SHA256 `d6d6fc1089616305047be36210a59249bc98501953189e3462dcc0fb339e8b56`. Kaikki 14 mallilähdettä on nyt varmennettu. Renderöinti ja kaksi muistokuvaa etenevät, yhteinen toimitus seuraa QA:n jälkeen.
