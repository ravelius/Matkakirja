// Sähkepinta ja pöllön sähketehtävä (Scripts/Peli/Sahke.cs, Sahketehtava.cs) webin kultaista
// jälkeä vasten (Kultaiset/sahkejalki.json = tee-sahkejalki.mjs: js/sahke.js ja js/fokusvirta.js),
// sekä natiivin omat virrat: terveystarkistus, kaveriapu kysymykseen ja vinkkisähkeen portti.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    /// <summary>Kuljetus ilman verkkoa: kirjaa kutsut ja vastaa heti (Vastaa = null → katkos).</summary>
    sealed class ValeSahke : ISahkeYhteys
    {
        public readonly List<(string Metodi, string Polku, string Runko)> Kutsut = new List<(string, string, string)>();
        public Func<string, string, SahkeVastaus> Vastaa;

        public void Kutsu(string metodi, string polku, string runko, Action<SahkeVastaus> valmis)
        {
            Kutsut.Add((metodi, polku, runko));
            valmis(Vastaa?.Invoke(metodi, polku) ?? SahkeVastaus.Katkos());
        }
    }

    static class SahkeTestit
    {
        static Dictionary<string, object> jalki;
        static Dictionary<string, object> Jalki => jalki ??= MiniJson.Objekti(MiniJson.Jasenna(
            File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "sahkejalki.json"))));

        static List<object> L(object o) => MiniJson.Taulukko(o);
        static Dictionary<string, object> O(object o) => MiniJson.Objekti(o);
        static int I(Dictionary<string, object> o, string n) => (int)MiniJson.Luku(o, n).Value;
        static List<string> Tekstit(object o) => o is List<object> l ? l.Select(x => x as string).ToList() : null;
        static string Yhdista(IEnumerable<string> l) => l == null ? "null" : "[" + string.Join("|", l) + "]";

        /// <summary>Kultaisen jäljen kaupunkitaulu (id → nimi, maa).</summary>
        static Dictionary<string, (string Nimi, string Maa)> Kaupungit =>
            L(Jalki["kaupungit"]).Select(L).ToDictionary(r => (string)r[0], r => ((string)r[1], (string)r[2]));

        static string Nimi(string id) => id != null && Kaupungit.TryGetValue(id, out var k) ? k.Nimi : null;

        static Sahkepinta Pinta(Dictionary<string, string> muisti, ValeSahke vale = null, Func<double> satunnainen = null, Func<long> kello = null)
        {
            var p = new Sahkepinta(vale ?? new ValeSahke(), k => muisti.TryGetValue(k, out var v) ? v : null,
                (k, v) => { if (v == null) muisti.Remove(k); else muisti[k] = v; }, satunnainen, kello);
            p.KaupunginNimi = Nimi;
            return p;
        }

        // =====================================================================
        // KULTAINEN JÄLKI
        // =====================================================================

        [Testi] static void VakiotJaPohjatKutenWeb()
        {
            var v = O(Jalki["vakiot"]);
            Oleta.Sama(MiniJson.Teksti(v, "osoite"), SahkeVakiot.Osoite);
            Oleta.Sama(MiniJson.Teksti(v, "koodinMerkit"), SahkeVakiot.KoodinMerkit);
            Oleta.Sama(I(v, "koodinPituus"), SahkeVakiot.KoodinPituus);
            Oleta.Sama(I(v, "nahtyjaKatto"), SahkeVakiot.NahtyjaKatto);
            Oleta.Sama(Yhdista(Tekstit(v["adjektiivit"])), Yhdista(SahkeNimet.Adjektiivit));
            Oleta.Sama(Yhdista(Tekstit(v["substantiivit"])), Yhdista(SahkeNimet.Substantiivit));
            Oleta.Sama(Yhdista(Tekstit(v["saatteet"])), Yhdista(SahkePohjat.Saatteet));
            Oleta.Sama(MiniJson.Teksti(v, "apupyynnonSaate"), SahkePohjat.ApupyynnonSaate);
            Oleta.Sama(MiniJson.Teksti(v, "veikkauksenSaate"), SahkePohjat.VeikkauksenSaate("Utelias Ilves"));
            Oleta.Sama(I(v, "merkkiMs"), SahkeTulkinta.MerkkiMs);
            Oleta.Sama(I(v, "riviKattoMs"), SahkeTulkinta.RiviKattoMs);
            Oleta.Sama(I(v, "rivivaliMs"), SahkeTulkinta.RivivaliMs);
            Oleta.Sama(I(v, "sahkePalkkio"), KauppaVakiot.SahkePalkkio);

            var pohjat = L(Jalki["pohjat"]).Select(O).ToList();
            Oleta.Sama(pohjat.Count, SahkePohjat.Kaikki.Count, "pohjia");
            for (int i = 0; i < pohjat.Count; i++)
            {
                var w = pohjat[i];
                var c = SahkePohjat.Kaikki[i];
                Oleta.Sama(MiniJson.Teksti(w, "id"), c.Id);
                Oleta.Sama(MiniJson.Teksti(w, "tyyppi"), c.Tyyppi.ToString().ToLowerInvariant(), c.Id);
                Oleta.Sama(MiniJson.Teksti(w, "nimi"), c.Nimi, c.Id);
                Oleta.Sama(MiniJson.Teksti(w, "paikat"), c.Paikat, c.Id);
            }
        }

        [Testi] static void NimimerkitSamastaSiemenesta()
        {
            var n = O(Jalki["nimet"]);
            var r = new Satunnainen((long)MiniJson.Luku(n, "siemen").Value);
            foreach (var k in L(n["kutsut"]).Select(O))
            {
                int montako = I(k, "montako");
                var odotettu = Tekstit(k["nimet"]);
                // Web: yksi nimi = sahkeArvoNimi, muuten sahkeArvoNimet(montako).
                var saatu = montako == 1 && odotettu.Count == 1 ? new List<string> { SahkeNimet.Arvo(r.Seuraava) } : SahkeNimet.ArvoNimet(r.Seuraava, montako);
                Oleta.Sama(Yhdista(odotettu), Yhdista(saatu), "montako " + montako);
                Oleta.Tosi(saatu.All(SahkeNimet.Kelpaa), "generaattorin nimet kelpaavat");
            }
            Oleta.Tosi(!SahkeNimet.Kelpaa("Utelias") && !SahkeNimet.Kelpaa("Utelias Ilves X") && !SahkeNimet.Kelpaa("Ilves Utelias"), "vapaa teksti ei kelpaa");
        }

        [Testi] static void LiittymiskoodiSuodatetaan()
        {
            foreach (var k in L(Jalki["koodit"]).Select(O))
                Oleta.Sama(MiniJson.Teksti(k, "koodi"), SahkeKoodi.Siisti(MiniJson.Teksti(k, "syote")), "syöte " + MiniJson.Teksti(k, "syote"));
        }

        [Testi] static void SahketekstitPohjastaJaKaupunkitaulusta()
        {
            foreach (var t in L(Jalki["tekstit"]).Select(O))
            {
                var pohja = MiniJson.Teksti(t, "pohjaId");
                var paikka = MiniJson.Teksti(t, "paikkaId");
                Oleta.Sama(MiniJson.Teksti(t, "teksti"), SahkePohjat.Teksti(pohja, paikka, Nimi), pohja + "/" + paikka);
            }
        }

        [Testi] static void LaitteenMuistiKutenLocalStorage()
        {
            var muisti = new Dictionary<string, string>();
            var p = Pinta(muisti);
            var askeleet = L(Jalki["muisti"]).Select(O).ToList();
            int i = 0;
            void Tarkista()
            {
                var w = askeleet[i++];
                var vaihe = MiniJson.Teksti(w, "vaihe");
                Oleta.Sama(Yhdista(Tekstit(w["nahdytLista"])), Yhdista(p.Nahdyt()), vaihe);
                muisti.TryGetValue(SahkeVakiot.NahdytAvain, out var tallessa);
                Oleta.Sama(MiniJson.Teksti(w, "tallessa"), tallessa, vaihe + " tallessa");
                Oleta.Tosi(w["tunnus"] == null && p.Tunnus == null, vaihe + " tunnus");
            }
            Tarkista();
            muisti[SahkeVakiot.NahdytAvain] = "rikki{";
            Tarkista();
            muisti[SahkeVakiot.NahdytAvain] = "[\"a\",1,\"b\",\"a\",null]";
            Tarkista();
            p.MerkitseNahdyksi(new[] { "c", "", "d" });
            Tarkista();
            for (int era = 0; era < 7; era++)
            {
                p.MerkitseNahdyksi(Enumerable.Range(0, 50).Select(j => "x" + (era * 50 + j)));
                Tarkista();
            }
            Oleta.Sama(askeleet.Count, i, "kaikki askeleet");

            foreach (var t in L(Jalki["tunnukset"]).Select(O))
            {
                muisti[SahkeVakiot.TunnusAvain] = MiniJson.Teksti(t, "raaka");
                var w = t["tunnus"] as Dictionary<string, object>;
                var c = p.Tunnus;
                Oleta.Sama(w == null, c == null, "tunnus " + MiniJson.Teksti(t, "raaka"));
                if (w == null) continue;
                Oleta.Sama(MiniJson.Teksti(w, "koodi"), c.Koodi);
                Oleta.Sama(MiniJson.Teksti(w, "jasenId"), c.JasenId);
                Oleta.Sama(MiniJson.Teksti(w, "avain"), c.Avain);
                Oleta.Sama(MiniJson.Teksti(w, "nimimerkki") ?? "", c.Nimimerkki);
            }

            foreach (var a in L(Jalki["asetukset"]).Select(O))
            {
                muisti[SahkeVakiot.TunnusAvain] = "vanha";
                var w = a["asetus"] as Dictionary<string, object>;
                p.AsetaTunnus(w == null ? null : new RetkikuntaTunnus
                {
                    Koodi = MiniJson.Teksti(w, "koodi"), JasenId = MiniJson.Teksti(w, "jasenId"),
                    Avain = MiniJson.Teksti(w, "avain"), Nimimerkki = MiniJson.Teksti(w, "nimimerkki"),
                });
                muisti.TryGetValue(SahkeVakiot.TunnusAvain, out var tallessa);
                Oleta.Sama(MiniJson.Teksti(a, "tallessa"), tallessa, "asetus");
            }
        }

        [Testi] static void TilankasittelyJonoonJaVeikkaus()
        {
            var k = O(Jalki["kasittely"]);
            var muisti = new Dictionary<string, string>
            {
                [SahkeVakiot.TunnusAvain] = "{\"koodi\":\"ABC234\",\"jasenId\":\"j-oma\",\"avain\":\"k1\",\"nimimerkki\":\"Utelias Ilves\"}",
            };
            var r = new Satunnainen((long)MiniJson.Luku(k, "siemen").Value);
            var p = Pinta(muisti, satunnainen: r.Seuraava);
            p.AsetaApu(new Kaveriapu { ApuId = "apu-oma" });
            int n = 0;
            foreach (var askel in L(k["askeleet"]).Select(O))
            {
                var nimi = "tila " + n++;
                p.KasitteleTila(askel["tila"] as Dictionary<string, object>);
                var jono = new List<SahkeViesti>();
                for (var v = p.SeuraavaJonosta(); v != null; v = p.SeuraavaJonosta()) jono.Add(v);
                var odotettu = L(askel["jono"]).Select(O).ToList();
                Oleta.Sama(odotettu.Count, jono.Count, nimi + " jonossa");
                for (int i = 0; i < jono.Count; i++)
                {
                    var w = odotettu[i];
                    var c = jono[i];
                    if (MiniJson.Teksti(w, "laji") == "sahke")
                    {
                        Oleta.Sama(SahkeViestiLaji.Sahke, c.Laji, nimi);
                        Oleta.Sama(MiniJson.Teksti(w, "saate"), c.Saate, nimi + " saate");
                        Oleta.Sama(MiniJson.Teksti(w, "pohjaId"), c.PohjaId, nimi);
                        Oleta.Sama(MiniJson.Teksti(w, "paikkaId"), c.PaikkaId, nimi);
                        Oleta.Sama(MiniJson.Teksti(w, "lahettaja"), c.Lahettaja, nimi);
                        Oleta.Sama(MiniJson.Teksti(w, "aika"), c.Aika, nimi);
                        Oleta.Sama(MiniJson.Teksti(w, "teksti"), c.Teksti, nimi);
                    }
                    else
                    {
                        Oleta.Sama(SahkeViestiLaji.Apupyynto, c.Laji, nimi);
                        Oleta.Sama(MiniJson.Teksti(w, "apuId"), c.ApuId, nimi);
                        Oleta.Sama(MiniJson.Teksti(w, "kysyja"), c.Kysyja, nimi);
                        Oleta.Sama(MiniJson.Teksti(w, "kysymys"), c.Kysymys, nimi);
                        Oleta.Sama(Yhdista(Tekstit(w["vaihtoehdot"])), Yhdista(c.Vaihtoehdot), nimi);
                    }
                }
                Oleta.Sama(Yhdista(Tekstit(askel["nahdyt"])), Yhdista(p.Nahdyt()), nimi + " nähdyt");
                var veikkaus = askel["veikkaus"] as Dictionary<string, object>;
                Oleta.Sama(veikkaus == null ? (int?)null : I(veikkaus, "indeksi"), p.Apu.Veikkaus, nimi + " veikkaus");
                if (veikkaus != null) Oleta.Sama(MiniJson.Teksti(veikkaus, "vastaaja"), p.Apu.Vastaaja, nimi);
            }
        }

        [Testi] static void TilankasittelyNimetJaOmatPois()
        {
            // Natiivin korjaus: nimi jäsenlistasta, omat sähkeet ja pyynnöt nähdyiksi mutta ei jonoon.
            var muisti = new Dictionary<string, string>
            {
                [SahkeVakiot.TunnusAvain] = "{\"koodi\":\"ABC234\",\"jasenId\":\"j-oma\",\"avain\":\"k1\",\"nimimerkki\":\"Utelias Ilves\"}",
            };
            var p = Pinta(muisti, satunnainen: () => 0);
            p.KasitteleTila(O(MiniJson.Jasenna(@"{""jasenet"":[{""jasenId"":""j-muu"",""nimimerkki"":""Viisas Naali""}],
                ""sahkeet"":[{""id"":""s1"",""lahettaja"":""j-muu"",""pohjaId"":""saavuin"",""paikkaId"":""oslo""},
                             {""id"":""s2"",""lahettaja"":""j-oma"",""pohjaId"":""saavuin"",""paikkaId"":""oslo""}],
                ""apupyynnot"":[{""apuId"":""a1"",""kysyja"":""j-oma"",""kysymys"":""K?"",""vaihtoehdot"":[""A"",""B""]},
                                {""apuId"":""a2"",""kysyja"":""j-muu"",""kysymys"":""K?"",""vaihtoehdot"":[""A"",""B""]}]}")));
            Oleta.Sama(2, p.Jono.Count, "vain muiden viestit");
            Oleta.Sama("Viisas Naali", p.Jono[0].Lahettaja);
            Oleta.Sama("SAAVUIN OSLO STOP MATKA JATKUU", p.Jono[0].Teksti);
            Oleta.Sama("Viisas Naali kysyy:", p.Jono[1].Alarivi);
            Oleta.Sama("[s1|s2|apu:a1|apu:a2]", Yhdista(p.Nahdyt()), "omatkin nähdyiksi");
        }

        [Testi] static void VirstanpylvaatKutenWeb()
        {
            var muisti = new Dictionary<string, string>
            {
                [SahkeVakiot.TunnusAvain] = "{\"koodi\":\"ABC234\",\"jasenId\":\"j-oma\",\"avain\":\"k1\",\"nimimerkki\":\"Utelias Ilves\"}",
            };
            var vale = new ValeSahke();
            var p = Pinta(muisti, vale);
            p.AsetaLinja(true);
            p.Nollaa();
            int n = 0;
            foreach (var v in L(Jalki["virstat"]).Select(O))
            {
                if (MiniJson.Totuus(v, "nollaa")) p.Nollaa();
                if (v.TryGetValue("linja", out var linja)) p.AsetaLinja((bool)linja);
                vale.Kutsut.Clear();
                var loydot = Tekstit(v["loydot"]).Select(id => new SahkePaikka(id, Nimi(id))).ToList();
                p.Virstanpylvaat(loydot, MiniJson.Teksti(v, "kaupunki"), MiniJson.Teksti(v, "maa"));
                var odotettu = L(v["pyynnot"]).Select(O).Select(w => $"{MiniJson.Teksti(w, "metodi")} {MiniJson.Teksti(w, "polku")} {MiniJson.Teksti(w, "runko")}");
                Oleta.Sama(Yhdista(odotettu), Yhdista(vale.Kutsut.Select(c => $"{c.Metodi} {c.Polku} {c.Runko}")), "virsta " + n++);
            }
        }

        [Testi] static void PyyntojenMuodotKutenWeb()
        {
            var muodot = L(Jalki["muodot"]).Select(O).Select(w => (MiniJson.Teksti(w, "metodi"), MiniJson.Teksti(w, "polku"), MiniJson.Teksti(w, "runko"))).ToList();
            var vale = new ValeSahke();
            var p = Pinta(new Dictionary<string, string>(), vale);
            p.AsetaLinja(true);
            p.Perusta("Utelias Ilves", _ => { });
            p.Liity("abc-234", "Höyryävä Majakka", _ => { });
            Oleta.Sama(muodot[0], vale.Kutsut[0], "luo");
            Oleta.Sama(muodot[1], vale.Kutsut[1], "liity");
            var t = new RetkikuntaTunnus { Koodi = "ABC234", JasenId = "j 1+/ä", Avain = "k&=?ö~*._-", Nimimerkki = "Utelias Ilves" };
            Oleta.Sama(muodot[2].Item2, Sahkepinta.TilaPolku(t), "tila");
            Oleta.Sama(muodot[3].Item3, Sahkepinta.SahkeRunko(t, "vinkki-vesi", "tukholma"), "sähke");
            Oleta.Sama(muodot[4].Item3, Sahkepinta.ApupyyntoRunko(t, "apu-x1", "Mikä \"laiva\" nousi\nmerestä?\u0001", new[] { "Vasa", "Kronan\\", "Titanic" }), "apu/kysy");
            Oleta.Sama(muodot[5].Item3, Sahkepinta.VeikkausRunko(t, "apu-x1", 2), "apu/vastaa");
        }

        [Testi] static void KirjoitusAikataulutKutenWeb()
        {
            int n = 0;
            foreach (var a in L(Jalki["aikataulut"]).Select(O))
            {
                var syote = a["syote"];
                var asetus = a["asetukset"] as Dictionary<string, object>;
                int merkki = asetus != null ? I(asetus, "merkkiMs") : SahkeTulkinta.MerkkiMs;
                int katto = asetus != null ? I(asetus, "kattoMs") : SahkeTulkinta.RiviKattoMs;
                int vali = asetus != null ? I(asetus, "valiMs") : SahkeTulkinta.RivivaliMs;
                var c = syote is List<object> l
                    ? SahkeTulkinta.KirjoitusAikataulu(l.Select(x => x as string), merkki, katto, vali)
                    : SahkeTulkinta.KirjoitusAikataulu(syote as string, merkki, katto, vali);
                var nimi = "aikataulu " + n++;
                Oleta.Sama(I(a, "valiMs"), c.ValiMs, nimi);
                Oleta.Sama(I(a, "kesto"), c.Kesto, nimi + " kesto");
                var rivit = L(a["rivit"]).Select(O).ToList();
                Oleta.Sama(rivit.Count, c.Rivit.Count, nimi + " rivejä");
                for (int i = 0; i < rivit.Count; i++)
                {
                    Oleta.Sama(MiniJson.Teksti(rivit[i], "teksti"), c.Rivit[i].Teksti, nimi);
                    Oleta.Sama(I(rivit[i], "merkit"), c.Rivit[i].Merkit, nimi);
                    Oleta.Sama(MiniJson.Luku(rivit[i], "merkkivali").Value, c.Rivit[i].Merkkivali, nimi + " merkkiväli");
                    Oleta.Sama(I(rivit[i], "kesto"), c.Rivit[i].Kesto, nimi);
                    Oleta.Sama(I(rivit[i], "alku"), c.Rivit[i].Alku, nimi);
                }
            }
        }

        [Testi] static void PalkkiotJaNormalisointi()
        {
            foreach (var p in L(Jalki["palkkiot"]).Select(O))
                Oleta.Sama(I(p, "palkkio"), KauppaVakiot.SahkePalkkioOhilyonneista(I(p, "ohi"), I(p, "pohja")), $"ohi {I(p, "ohi")} pohja {I(p, "pohja")}");
            foreach (var t in L(Jalki["normit"]).Select(O))
                Oleta.Sama(MiniJson.Teksti(t, "tulos"), SahkeTulkinta.Normalisoi(MiniJson.Teksti(t, "syote")), "normi " + MiniJson.Teksti(t, "syote"));
        }

        static Dictionary<string, Sahketehtava> Tehtavat() =>
            L(O(Jalki["fokusvirrat"])["alkiot"]).Select(O).ToDictionary(a => MiniJson.Teksti(a, "kaupunki"),
                a => Sahketehtava.Lue(O(O(a["data"])["sahketehtava"]), MiniJson.Teksti(a, "kaupunki")));

        [Testi] static void VapaaTulkintaJaAukotKutenWeb()
        {
            var tehtavat = Tehtavat();
            Oleta.Tosi(tehtavat.Count >= 2, "pilotteja");
            foreach (var t in L(Jalki["tulkinnat"]).Select(O))
            {
                var teksti = MiniJson.Teksti(t, "teksti");
                var r = SahkeTulkinta.TulkitseVapaa(teksti, tehtavat[MiniJson.Teksti(t, "kaupunki")]);
                Oleta.Sama(MiniJson.Totuus(t, "osui"), r.Osui, teksti);
                Oleta.Sama(Yhdista(Tekstit(t["vaarat"])), Yhdista(r.Vaarat.Select(a => a.Id)), teksti);
            }
            foreach (var o in L(Jalki["osumat"]).Select(O))
            {
                var aukko = tehtavat[MiniJson.Teksti(o, "kaupunki")].Aukot.First(a => a.Id == MiniJson.Teksti(o, "aukko"));
                var arvo = MiniJson.Teksti(o, "arvo");
                Oleta.Sama(MiniJson.Totuus(o, "osuu"), SahkeTulkinta.AukkoOsuu(aukko, arvo), $"{aukko.Id} '{arvo}'");
            }
        }

        [Testi] static void OhilyonninSahkeKutenWeb()
        {
            var tehtavat = Tehtavat();
            foreach (var o in L(Jalki["ohilyonnit"]).Select(O))
            {
                var t = tehtavat[MiniJson.Teksti(o, "kaupunki")];
                if (MiniJson.Totuus(o, "ilmanVaarinSahketta"))
                {
                    var ilman = Sahketehtava.Lue(O(MiniJson.Jasenna("{}")), t.Kaupunki);
                    ilman.Aukot = t.Aukot.Select((a, i) => new SahkeAukko { Id = a.Id, Otsake = a.Otsake, SahkeSana = i == 1 ? null : a.SahkeSana }).ToList();
                    t = ilman;
                }
                var ids = Tekstit(o["vaarat"]);
                var vaarat = ids.Select(id => t.Aukot.First(a => a.Id == id)).ToList();
                Oleta.Sama(MiniJson.Teksti(o, "sahke"), SahkeTulkinta.OhilyonninSahke(t, vaarat), string.Join(",", ids));
            }
        }

        // =====================================================================
        // NATIIVIN VIRRAT
        // =====================================================================

        const string OmaTunnus = "{\"koodi\":\"ABC234\",\"jasenId\":\"j-oma\",\"avain\":\"k1\",\"nimimerkki\":\"Utelias Ilves\"}";

        [Testi] static void TerveystarkistusAvaaTaiSulkeeLinjan()
        {
            (bool? Linja, int Kutsuja, bool Tunnus) Aja(string tunnus, int tila)
            {
                var muisti = new Dictionary<string, string>();
                if (tunnus != null) muisti[SahkeVakiot.TunnusAvain] = tunnus;
                var vale = new ValeSahke { Vastaa = (_, __) => tila == 0 ? SahkeVastaus.Katkos() : SahkeVastaus.Jasenna(tila, "{}") };
                var p = Pinta(muisti, vale);
                p.Kaynnista();
                return (p.Linja, vale.Kutsut.Count, p.Tunnus != null);
            }
            Oleta.Sama((true, 1, false), Aja(null, 404), "tunnukseton: HEAD 404 riittää, ei pollausta");
            Oleta.Sama((false, 1, false), Aja(null, 403), "Origin-portti sulkee");
            Oleta.Sama((false, 1, false), Aja(null, 0), "katkos sulkee");
            Oleta.Sama((true, 2, true), Aja(OmaTunnus, 200), "tunnuksellinen: tila + heti pollaus");
            Oleta.Sama((true, 1, false), Aja(OmaTunnus, 401), "vanhentunut tunnus unohtuu, linja auki");
            Oleta.Sama((false, 1, true), Aja(OmaTunnus, 503), "worker rikki: linja kiinni, tunnus säilyy");

            var kiinni = Pinta(new Dictionary<string, string>());
            kiinni.AsetaLinja(false);
            var r = kiinni.Retkikunta();
            Oleta.Tosi(!r.LinjaAuki && r.Rivi == SahkeVakiot.LinjaKiinni, "kiinni oleva linja kerrotaan yhdellä rivillä");
        }

        [Testi] static void PollausKellonMukaan()
        {
            long nyt = 1_000_000;
            var muisti = new Dictionary<string, string> { [SahkeVakiot.TunnusAvain] = OmaTunnus };
            var vale = new ValeSahke { Vastaa = (_, __) => SahkeVastaus.Jasenna(200, "{}") };
            var p = Pinta(muisti, vale, kello: () => nyt);
            p.Kaynnista();
            vale.Kutsut.Clear();
            p.Aja();
            Oleta.Sama(0, vale.Kutsut.Count, "väli ei kulunut");
            nyt += SahkeVakiot.PollausMs;
            p.Aja();
            Oleta.Sama(1, vale.Kutsut.Count, "minuutin välein");
            p.Etualalle();
            Oleta.Sama(2, vale.Kutsut.Count, "etualalle heti");
        }

        static (Matka M, Kysely K, AvoinKysymys Q) Kysymyksessa()
        {
            var m = Matka.Luo(KultaisetApu.Verkko, new Satunnainen(12345L), "Fogg", "pariisi", KultaisetApu.Laattamaarat);
            var k = new Kysely(m, KyselyTestit.Data);
            m.AloitaVuoro();
            var kaupunki = m.Laatat.Laatat.Keys.First(c => KyselyTestit.Data.Kaupungeittain.ContainsKey(c) && k.KaariTarina(c) == null);
            m.Tila.Pelaaja.Sijainti = Sijainti.KaupungissaSijainti(kaupunki);
            m.Tila.Pelaaja.Raha = 100;
            var tulos = k.Avaa(muoto: KysymysMuoto.Visa);
            if (!tulos.Ok) throw new Exception("kysymys ei auennut: " + tulos.Virhe);
            var q = m.Tila.Kysely.Kysymys;
            if (q.Vaihtoehdot.Count < 2) throw new Exception("testi olettaa monivalinnan");
            return (m, k, q);
        }

        [Testi] static void KaveriapuVeloittaaPysayttaaKellonJaOdottaaVeikkausta()
        {
            long nyt = 5_000_000;
            var muisti = new Dictionary<string, string> { [SahkeVakiot.TunnusAvain] = OmaTunnus };
            string tila = "{}";
            var vale = new ValeSahke { Vastaa = (_, __) => SahkeVastaus.Jasenna(200, tila) };
            var p = Pinta(muisti, vale, satunnainen: () => 0.5, kello: () => nyt);
            var (m, k, q) = Kysymyksessa();

            Oleta.Tosi(!p.Apunappi(m).Nakyy, "linja ei vielä auki: ei nappia");
            p.Kaynnista();
            var nappi = p.Apunappi(m);
            Oleta.Tosi(nappi.Nakyy && nappi.Kaytossa, "nappi näkyy");
            Oleta.Sama("Kysy kaverilta (25 £)", nappi.Teksti);

            vale.Kutsut.Clear();
            var tulos = p.KysyKaverilta(k);
            Oleta.Tosi(tulos.Ok, tulos.Virhe);
            Oleta.Sama(75, m.Tila.Pelaaja.Raha, "25 £ pelin omalla reitillä");
            Oleta.Tosi(q.Kaveriapu && p.KelloPysaytetty(q), "aika pysähtyi");
            Oleta.Sama("POST /apu/kysy", vale.Kutsut[0].Metodi + " " + vale.Kutsut[0].Polku);
            Oleta.Tosi(vale.Kutsut[0].Runko.Contains(SahkeTeksti.Json(q.Kysymys)), "kysymys runkoon");
            var n2 = p.Apunappi(m);
            Oleta.Tosi(!n2.Kaytossa && n2.Teksti == "Kaverilta kysytty", "nappi harmaana");
            Oleta.Tosi(!p.KysyKaverilta(k).Ok, "toista kertaa ei");
            Oleta.Sama(75, m.Tila.Pelaaja.Raha, "ei toista veloitusta");

            var kortti = p.Apukortti(m);
            Oleta.Tosi(kortti.Nappi == null && kortti.Alarivi.Contains("10 min"), "perua saa vasta 10 min kuluttua");
            Oleta.Tosi(!p.SuljeApu(), "ei aikalisää");
            Oleta.Sama(SahkeVakiot.ApupollausMs, p.PollausVali, "tiheämpi pollaus");

            tila = "{\"apuvastaukset\":[{\"apuId\":\"" + p.Apu.ApuId + "\",\"vastaaja\":\"j-muu\",\"veikkaus\":1}],"
                 + "\"jasenet\":[{\"jasenId\":\"j-muu\",\"nimimerkki\":\"Viisas Naali\"}]}";
            nyt += SahkeVakiot.ApupollausMs;
            p.Aja();
            kortti = p.Apukortti(m);
            Oleta.Sama(1, kortti.VeikattuIndeksi, "veikkaus saapui");
            Oleta.Sama("Viisas Naali veikkaa: " + q.Vaihtoehdot[1], kortti.VeikkausTeksti);
            Oleta.Sama("Selvä", kortti.Nappi);
            Oleta.Tosi(p.SuljeApu() && p.Apu == null && !p.KelloPysaytetty(q), "Selvä: kello jatkuu");
            Oleta.Sama(SahkeVakiot.PollausMs, p.PollausVali);
        }

        [Testi] static void KaveriapuVerkkovirheSalliiPerumisen()
        {
            var muisti = new Dictionary<string, string> { [SahkeVakiot.TunnusAvain] = OmaTunnus };
            var vale = new ValeSahke { Vastaa = (_, polku) => polku == "/apu/kysy" ? SahkeVastaus.Katkos() : SahkeVastaus.Jasenna(200, "{}") };
            var p = Pinta(muisti, vale);
            var (m, k, q) = Kysymyksessa();
            p.Kaynnista();
            Oleta.Tosi(p.KysyKaverilta(k).Ok, "veloitettu");
            var kortti = p.Apukortti(m);
            Oleta.Tosi(kortti.Virhe != null && kortti.Nappi == "Peru odotus", "heti peruttavissa");
            Oleta.Tosi(p.SuljeApu(), "peruttu");
            Oleta.Sama(75, m.Tila.Pelaaja.Raha, "raha silti mennyt, kuten 50:50");

            // Vastaaminen lopettaa odotuksen ilman ohjaimen kutsua (PaivitaApu).
            var (m2, k2, q2) = Kysymyksessa();
            vale.Vastaa = (_, __) => SahkeVastaus.Jasenna(200, "{}");
            Oleta.Tosi(p.KysyKaverilta(k2).Ok, "toinen kysymys");
            k2.Vastaa(q2.Oikea);
            p.PaivitaApu(m2);
            Oleta.Tosi(p.Apu == null, "vastattu kysymys päättää avun");
        }

        [Testi] static void KaveriapuVaatiiRahanJaRetkikunnan()
        {
            var vale = new ValeSahke { Vastaa = (_, __) => SahkeVastaus.Jasenna(404, "{}") };
            var ilman = Pinta(new Dictionary<string, string>(), vale);
            ilman.Kaynnista();
            var (m, k, _) = Kysymyksessa();
            Oleta.Tosi(ilman.LinjaAuki && !ilman.Apunappi(m).Nakyy, "ei retkikuntaa: ei nappia");
            Oleta.Tosi(!ilman.KysyKaverilta(k).Ok && m.Tila.Pelaaja.Raha == 100, "ei veloitusta");

            var p = Pinta(new Dictionary<string, string> { [SahkeVakiot.TunnusAvain] = OmaTunnus }, new ValeSahke { Vastaa = (_, __) => SahkeVastaus.Jasenna(200, "{}") });
            p.Kaynnista();
            m.Tila.Pelaaja.Raha = 24;
            Oleta.Tosi(!p.Apunappi(m).Nakyy, "alle 25 £: ei nappia");
            Oleta.Tosi(!p.KysyKaverilta(k).Ok && p.Apu == null, "rahat eivät riitä");
        }

        [Testi] static void VinkkiVainOmastaLoydosta()
        {
            var vale = new ValeSahke { Vastaa = (_, __) => SahkeVastaus.Jasenna(200, "{}") };
            var p = Pinta(new Dictionary<string, string> { [SahkeVakiot.TunnusAvain] = OmaTunnus }, vale);
            p.Kaynnista();
            var m = Matka.Luo(KultaisetApu.Verkko, new Satunnainen(12345L), "Fogg", "pariisi", KultaisetApu.Laattamaarat);
            p.KaupunginNimi = SahkePohjat.Nimet(m.Verkko);
            vale.Kutsut.Clear();
            string rivi = null;
            p.LahetaVinkki("vinkki-vesi", "pariisi", m, (ok, r) => rivi = r);
            Oleta.Sama(Sahkepinta.EiPaikkoja(SahkePohjat.Hae("vinkki-vesi")), rivi, "ei löytöä");
            Oleta.Sama(0, vale.Kutsut.Count, "ei lähetetty");

            m.Laatat.PaaaarteetLoydetty.Aseta("testi", "pariisi");
            bool lahti = false;
            p.LahetaVinkki("vinkki-vesi", "pariisi", m, (ok, r) => { lahti = ok; rivi = r; });
            Oleta.Tosi(lahti, rivi);
            Oleta.Sama("Sähke lähti: VINKKI PARIISI STOP SEURAA VETTÄ", rivi);
            p.LahetaVinkki("saavuin", "pariisi", m, (ok, r) => rivi = r);
            Oleta.Sama("Tuntematon sähkepohja.", rivi, "automaattipohjaa ei lähetetä käsin");
        }

        // =====================================================================
        // SÄHKETEHTÄVÄ
        // =====================================================================

        [Testi] static void SahketehtavaOhilyontiPienentaaPalkkiotaEikaLukitse()
        {
            var t = Tehtavat()["sofia"];
            var tila = new SahketehtavaTila();
            var kortti = tila.Kortti(t);
            Oleta.Tosi(kortti.Lomake && kortti.Animoi && kortti.Palkkio == 200, "ensimmäinen avaus animoi, palkkio 200");
            Oleta.Tosi(!tila.Kortti(t).Animoi, "toinen avaus valmiina");

            var vaarin = t.Aukot.ToDictionary(a => a.Id, a => "väärin");
            var r = tila.Laheta(t, vaarin);
            Oleta.Sama(SahkeVastausLaji.Ohi, r.Laji);
            Oleta.Sama(150, r.Palkkio, "−25 %");
            Oleta.Sama(r.Teksti, tila.Kortti(t).ViimeSahke, "paluusähke kortille");
            r = tila.Laheta(t, vaarin);
            Oleta.Tosi(r.VinkkiNakyy == (t.Vinkki.Count > 0) && r.Palkkio == 100, "kahden jälkeen vinkki");

            Oleta.Sama(SahkeVastausLaji.Tyhja, tila.LahetaVapaa(t, "  ").Laji, "tyhjä ei ole ohilyönti");
            Oleta.Sama(2, tila.Ohi("sofia"));
            Oleta.Sama(SahkeVastausLaji.Pollolle, tila.LahetaVapaa(t, "en tiedä").Laji, "paikallinen tulkinta ei tuomitse");
            Oleta.Sama(SahkeVastausLaji.EiVastausta, tila.PollonTuomio(t, null).Laji, "pöllöä ei tavoitettu");
            Oleta.Sama(2, tila.Ohi("sofia"), "verkon vika ei ole pelaajan");

            Oleta.Sama(SahkeVastausLaji.Osui, tila.LahetaVapaa(t, "varna 1974").Laji);
            Oleta.Tosi(tila.LentoKesken("sofia"), "Livia lennossa");
            var jalkeen = tila.Kortti(t);
            Oleta.Tosi(!jalkeen.Lomake && jalkeen.Sahke == t.Lahetetty, "lähetetyn kuittaus");
            Oleta.Sama(SahkeVastausLaji.JoVastattu, tila.Laheta(t, vaarin).Laji);

            var kuittaus = tila.KuittausKortti(t);
            Oleta.Tosi(kuittaus.Kuittaus && !kuittaus.Lomake && kuittaus.Animoi, "kuittaus kirjoitetaan kerran");
            Oleta.Tosi(!tila.KuittausKortti(t).Animoi, "toisella kerralla valmiina");
            Oleta.Sama(SahketehtavaTila.Kuittaus(t), kuittaus.Teksti);
            Oleta.Sama(t.Lento, kuittaus.Nappi);
            Oleta.Sama(SahkeTulkinta.PaluuMerkkiMs >= kuittaus.Aikataulu.Rivit[0].Merkkivali, true, "paluutahti");
        }

        [Testi] static void SahkepullatKirjanpidosta()
        {
            var t = Tehtavat()["tukholma"];
            var m = Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(9L), "Fogg", "pariisi", KultaisetApu.Laattamaarat);
            var ka = new Kaupat(m);
            m.Tila.Pelaaja.Raha = 100;
            var tila = new SahketehtavaTila();
            var k = SahketehtavaTila.Pullat(tila.Kortti(t), t, ka);
            Oleta.Sama(t.Vinkki.Count > 0, k.VinkkiTarjolla, "vinkki tarjolla");
            Oleta.Sama(t.Vastauslinkki != null, k.LinkkiTarjolla, "linkki tarjolla");
            Oleta.Tosi(!k.VinkkiOstettu && !k.LinkkiOstettu && k.LinkkiNappi == null, "ei ostettu");
            if (t.Vastauslinkki == null) return;
            Oleta.Tosi(SahketehtavaTila.OstaLinkki(ka, t).Ok, "linkki ostettu");
            Oleta.Sama(75, m.Tila.Pelaaja.Raha, "25 £");
            k = SahketehtavaTila.Pullat(tila.Kortti(t), t, ka);
            Oleta.Tosi(k.LinkkiOstettu && k.LinkkiNappi == t.Vastauslinkki.Nappi, "linkkinappi näkyvissä");
            Oleta.Tosi(!SahketehtavaTila.OstaLinkki(ka, t).Ok, "ei kahdesti");
            Oleta.Sama(75, m.Tila.Pelaaja.Raha);
        }
    }
}
