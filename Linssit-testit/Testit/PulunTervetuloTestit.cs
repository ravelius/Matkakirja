// Pulun ISS-tervetulo (A1–A2, omistaja 29.9.2026: B ja C pois, ei kuplia): repliikit ja vakiot webin kultaisia arvoja vasten
// (kultaiset/pulu-iss.json, tee-pulu-iss.mjs) ja tilakone webin testien mukaan (tests/pulu-iss.test.mjs): ajoitus äänen
// kellosta, ohitus, kerran-muisti, mykistys, Pulu ei voi puhua ja mustan verhon odotus. Kello, puhe ja muisti ovat tynkiä.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Astronautti;

namespace Matkakirja.Linssit.Testit
{
    public static class PulunTervetuloTestit
    {
        static string Polku(string nimi) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", nimi);
        static JsonElement K() => JsonDocument.Parse(File.ReadAllText(Polku("pulu-iss.json"))).RootElement;

        sealed class Vale : ITervetulonYmparisto
        {
            public double Aika;
            public bool OnPaljastettu = true, Mykka, Voi = true, Muisti;
            public readonly List<string> Sanotut = new List<string>();
            public readonly List<Action<double?>> Soittimet = new List<Action<double?>>();
            public int Vaientui;
            public PulunTervetulo T;

            public double Nyt => Aika;
            public bool Paljastettu() => OnPaljastettu;
            public bool Sano(IssRepliikki r, Action<double?> aaniAlkoi)
            {
                if (!Voi) return false;
                Sanotut.Add(r.Avain);
                Soittimet.Add(aaniAlkoi);
                return true;
            }
            public bool Mykistetty() => Mykka;
            public void Vaikene() => Vaientui++;
            public bool Kuultu() => Muisti;
            public void MerkitseKuulluksi() => Muisti = true;

            /// <summary>Kello eteenpäin ja erääntyneet ajastimet (webin tynkäkellon kulje).</summary>
            public void Kulje(double ms) { Aika += ms; T?.Paivita(); }

            /// <summary>Nykyinen repliikki soi alusta loppuun (web soitaLoppuun: 'playing' heti, 'ended' kestonsa jälkeen).</summary>
            public void SoitaLoppuun()
            {
                var r = PulunIss.Jakso.First(x => x.Avain == Sanotut.Last());
                Soittimet.Last()(r.KestoMs);
                Kulje(r.KestoMs);
            }
        }

        static Vale Aloita(Action<Vale> asetus = null)
        {
            var v = new Vale();
            asetus?.Invoke(v);
            v.T = PulunTervetulo.Aloita(v);
            return v;
        }

        [Testi] static void RepliikitJaVakiotKutenWebissa()
        {
            var k = K();
            var jakso = k.GetProperty("jakso").EnumerateArray().ToList();
            Oleta.Sama(jakso.Count, PulunIss.Jakso.Count);
            Oleta.Sama(2, PulunIss.Jakso.Count, "omistaja 29.9.: vain A1 ja A2");
            for (int i = 0; i < jakso.Count; i++)
            {
                var w = jakso[i];
                var r = PulunIss.Jakso[i];
                Oleta.Sama(w.GetProperty("avain").GetString(), r.Avain);
                Oleta.Sama(w.GetProperty("lahde").GetString(), r.Lahde);
                Oleta.Sama(w.GetProperty("indeksi").GetInt32(), r.Indeksi);
                Oleta.Sama(w.GetProperty("teksti").GetString(), r.Teksti, r.Avain);
                Oleta.Sama(w.GetProperty("kestoMs").GetDouble(), r.KestoMs, r.Avain);
                Oleta.Sama(w.GetProperty("aani").GetString(), r.Aani, r.Avain);
                Oleta.Tosi(!r.Teksti.Contains("["), "tagit eivät kuulu tekstiin: " + r.Avain);
            }
            var v = k.GetProperty("vakiot");
            Oleta.Sama(v.GetProperty("talle").GetString(), PulunIss.TalleAvain);
            Oleta.Sama(v.GetProperty("viiveMs").GetDouble(), PulunIss.TervetulonViiveMs);
            Oleta.Sama(v.GetProperty("kyselyMs").GetDouble(), PulunIss.KyselyMs);
            Oleta.Sama(v.GetProperty("kattoMs").GetDouble(), PulunIss.KattoMs);
            Oleta.Sama(v.GetProperty("hengahdysMs").GetDouble(), PulunIss.HengahdysMs);
            Oleta.Sama(v.GetProperty("varaMs").GetDouble(), PulunIss.VaraMs);
        }

        [Testi] static void A1JaA2Jarjestyksessa()
        {
            var v = Aloita();
            Oleta.Tosi(v.T != null);
            // Ei puhetta ennen paljastusta ja hengähdystä.
            v.Kulje(PulunIss.TervetulonViiveMs - 1);
            Oleta.Sama(0, v.Sanotut.Count);
            v.Kulje(1);
            Oleta.Sama("iss-a-1", string.Join(" ", v.Sanotut));
            Oleta.Tosi(v.Muisti, "muisti kirjoitetaan, kun A1 on alkanut");
            Oleta.Tosi(v.T.Puhuu);
            v.SoitaLoppuun();
            Oleta.Tosi(!v.T.Puhuu && v.T.Kesken, "hengähdys: ei puhu, mutta jakso on kesken");
            v.Kulje(400); // A1 → A2
            v.SoitaLoppuun(); v.Kulje(400);
            Oleta.Sama("iss-a-1 iss-a-2", string.Join(" ", v.Sanotut));
            Oleta.Sama(TervetulonVaihe.Valmis, v.T.Vaihe);
            Oleta.Tosi(!v.T.Kesken && !v.T.Puhuu);
            Oleta.Sama(0, v.Vaientui);
        }

        [Testi] static void NapautusVaientaa()
        {
            var v = Aloita();
            // Napautus ennen ensimmäistä repliikkiä ei ohita (tavallista katselua).
            Oleta.Tosi(!v.T.Napautus());
            v.Kulje(PulunIss.TervetulonViiveMs);
            Oleta.Sama("iss-a-1", string.Join(" ", v.Sanotut));
            Oleta.Tosi(v.T.Napautus());
            Oleta.Sama(1, v.Vaientui);
            Oleta.Sama(TervetulonVaihe.Ohitettu, v.T.Vaihe);
            Oleta.Sama("ohitus:napautus", string.Join(" ", v.T.Tapahtumat));
            // Mitään ei enää sanota.
            v.Soittimet.Last()(PulunIss.Jakso[0].KestoMs);
            v.Kulje(60000);
            Oleta.Sama("iss-a-1", string.Join(" ", v.Sanotut));
            Oleta.Tosi(!v.T.Napautus(), "ohitettu jakso ei ohitu uudelleen");
            // Ohitus odotusvaiheessa ei vaienna (mitään ei soi).
            var w = Aloita();
            Oleta.Tosi(w.T.Ohita());
            Oleta.Sama(0, w.Vaientui);
            w.Kulje(10000);
            Oleta.Sama(0, w.Sanotut.Count);
        }

        [Testi] static void KuullaanKerran()
        {
            var v = Aloita();
            v.Kulje(PulunIss.TervetulonViiveMs);
            v.T.Pura();
            Oleta.Sama(1, v.Vaientui, "pura vaientaa kesken olevan puheen");
            Oleta.Sama(TervetulonVaihe.Purettu, v.T.Vaihe);
            // Toinen avaus samalla laitteella: ei tervetuloa.
            Oleta.Tosi(PulunTervetulo.Aloita(v) == null);
            // Purku ennen A1:tä ei kuluta muistia.
            var w = Aloita();
            w.Kulje(500);
            w.T.Pura();
            Oleta.Tosi(!w.Muisti);
            Oleta.Sama(0, w.Vaientui);
            w.Kulje(10000);
            Oleta.Sama(0, w.Sanotut.Count);
        }

        [Testi] static void PuluEiVoiPuhuaJaksoPoisMuistiEnnallaan()
        {
            var v = Aloita(x => x.Voi = false);
            v.Kulje(PulunIss.TervetulonViiveMs);
            Oleta.Sama(TervetulonVaihe.Pois, v.T.Vaihe);
            Oleta.Tosi(!v.Muisti);
            // Myöhemmällä rivillä hypätään yli hengähdyksen jälkeen, ja jakso päättyy.
            var w = Aloita();
            w.Kulje(PulunIss.TervetulonViiveMs);
            w.Voi = false;
            w.SoitaLoppuun(); w.Kulje(400);
            Oleta.Sama("iss-a-1", string.Join(" ", w.Sanotut));
            w.Kulje(400);
            Oleta.Sama(TervetulonVaihe.Valmis, w.T.Vaihe);
        }

        [Testi] static void MykistettynaEiAloitetaJaKeskenOhittaa()
        {
            var v = new Vale { Mykka = true };
            Oleta.Tosi(PulunTervetulo.Aloita(v) == null);
            Oleta.Tosi(!v.Muisti);
            // Mykistys kesken jakson: seuraavaa repliikkiä ei sanota.
            var w = Aloita();
            w.Kulje(PulunIss.TervetulonViiveMs);
            w.Mykka = true;
            w.SoitaLoppuun();
            w.Kulje(400);
            Oleta.Sama("iss-a-1", string.Join(" ", w.Sanotut));
            Oleta.Sama(TervetulonVaihe.Ohitettu, w.T.Vaihe);
            // Mykistys odotuksen aikana: jakso jää pois.
            var x = Aloita();
            x.Mykka = true;
            x.Kulje(PulunIss.TervetulonViiveMs);
            Oleta.Sama(TervetulonVaihe.Pois, x.T.Vaihe);
            Oleta.Sama(0, x.Sanotut.Count);
        }

        [Testi] static void OdottaaMustanVerhonPoistumista()
        {
            var v = Aloita(x => x.OnPaljastettu = false);
            v.Kulje(5000);
            Oleta.Sama(0, v.Sanotut.Count);
            Oleta.Tosi(v.T.Kesken, "odotusvaihe on kesken (selitteen luenta estetty, web #3609)");
            v.OnPaljastettu = true;
            v.Kulje(PulunIss.KyselyMs + PulunIss.TervetulonViiveMs);
            Oleta.Sama("iss-a-1", string.Join(" ", v.Sanotut));
            // Katto: verho ei poistu 20 s:ssa → jakso pois.
            var w = Aloita(x => x.OnPaljastettu = false);
            for (int i = 0; i < 90; i++) w.Kulje(250);
            Oleta.Sama(TervetulonVaihe.Pois, w.T.Vaihe);
        }

        [Testi] static void VarakelloIlmanSoittoa()
        {
            // Soitin ei kerro alkaneensa: repliikki päättyy kesto + 2 s.
            var v = Aloita();
            v.Kulje(PulunIss.TervetulonViiveMs);
            v.Kulje(PulunIss.Jakso[0].KestoMs + PulunIss.VaraMs - 1);
            Oleta.Tosi(v.T.Puhuu);
            v.Kulje(1 + 400);
            Oleta.Sama("iss-a-1 iss-a-2", string.Join(" ", v.Sanotut));
            // Ääni jää pois (null): varakello päättää silti.
            v.Soittimet.Last()(null);
            v.Kulje(PulunIss.Jakso[1].KestoMs + PulunIss.VaraMs + 400);
            Oleta.Sama(TervetulonVaihe.Valmis, v.T.Vaihe);
        }
    }
}
