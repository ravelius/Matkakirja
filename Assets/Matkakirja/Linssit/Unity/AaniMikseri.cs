// ÄÄNIMIKSERI (Pelikoodari 30.9.2026; omistaja Päätoimittajan kautta: "Saisiko pelissä säädettyä kaiut ja tausta äänen
// tasot ja sitten kun ne ovat kohdillaan niin poltetaan ne"). Kehittäjätilan äänipuoli Natiivi-UI:n MikseriPaneelille
// (IMikseriLahde): kaksi lähdettä, jotka kirjoittavat säädöt suoraan soittimien kertoimiin.
//
//   Cupola  (CupolaAani.Tila): humina, radio ja niiden väistö puheen alla (CupolaAani:n staattiset tasot).
//   Linna   (DioraamaAanet.Avaa/Sulje): kohdistetun huoneen taustat yhteensä, soivat taustaraidat (enintään 6, ääni-id),
//           taustojen väistö puheen alla ja kaikuhuoneissa kaiku (päällä/pois, määrä, pitkä kaiku). Kaiku soi vain
//           mikseritilassa (DioraamaAanet.MikseriTila: kuiva + kaiku -stemit tahdistettuna), joka on päällä vain
//           kehittäjätilassa.
//
// A = tallennetut arvot, B = muokatut (paneeli kytkee B:n ensimmäisestä muokkauksesta). Tallenna kirjoittaa muokatut
// tallennetuiksi (PlayerPrefs, säilyy uudelleenkäynnistyksen yli) ja lähettää koko tallennetun tilan JSONina
// palautekanavaan (sivu "Äänimikseri"), josta arvot poltetaan sisältöön (aanimiksaus.json). Testiympäristössä
// (simulaattori/testiajo) ei lähetetä, vain lokiin.
// Testi: ui aanimikseri [tila] | cupola | linna | aseta <id> <arvo> | b 0|1 | tallenna.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class AaniMikseri
    {
        const string Avain = "matkakirja-aanimikseri-v1";
        static readonly CultureInfo Inv = CultureInfo.InvariantCulture;
        /// <summary>Huoneet, joilla on kaikustemit (aanet/mikseri/v1); muualla kaikusäätimiä ei näytetä.</summary>
        public static readonly HashSet<string> KaikuHuoneet = new HashSet<string> { "keittio" };
        static readonly Dictionary<string, string> HuoneNimet = new Dictionary<string, string>
        {
            [""] = "Yleisnäkymä", ["laituri"] = "Laituri", ["fatabuuri"] = "Fatabuuri", ["kierreportaat"] = "Kierreportaat",
            ["muurinharja"] = "Muurinharja", ["kappeli"] = "Kappeli", ["keskushalli"] = "Keskushalli", ["keittio"] = "Keittiö",
        };

        static readonly Dictionary<string, string> RaitaNimet = new Dictionary<string, string>
        {
            ["jarvi-laineet"] = "Järven laineet", ["linna-tuuli"] = "Tuuli", ["tulisija-ratina"] = "Tulisija",
            ["keittio-ambienssi"] = "Keittiön hälinä", ["pata-poreilu"] = "Pata", ["vaivaaminen"] = "Vaivaaminen",
        };
        static string RaidanNimi(string id) => RaitaNimet.TryGetValue(id, out var n) ? n
            : id.Length > 0 ? char.ToUpperInvariant(id[0]) + id.Substring(1).Replace('-', ' ') : id;

        /// <summary>Tallennetut (A) ja muokatut (B) arvot avaimella "cupola|humina", "linna|keittio|huone",
        /// "linna|*|tausta:&lt;ääni-id&gt;" jne. Puuttuva = oletus.</summary>
        static readonly Dictionary<string, float> tallennettu = new Dictionary<string, float>(), muokattu = new Dictionary<string, float>();
        static bool b, ladattu;
        static string viimeTila = "";

        static readonly float CupolaHumina = CupolaAani.HuminaVoima, CupolaRadio = CupolaAani.RadioVoima,
            CupolaHuminaVaisto = CupolaAani.HuminaVaisto, CupolaRadioVaisto = CupolaAani.RadioVaisto;

        public static readonly CupolaLahde Cupola = new CupolaLahde();
        public static readonly LinnaLahde Linna = new LinnaLahde();

        // --- kytkennät -----------------------------------------------------------------------------------------------

        /// <summary>CupolaAani: Cupolaan (true) tai pois. Paneeli näyttää Cupolan lähteen vain sen ajan.</summary>
        public static void CupolaTila(bool cupolassa)
        {
            Lataa();
            if (cupolassa) { Sovella(); MikseriPaneeli.Lahde = Cupola; }
            else if (MikseriPaneeli.Lahde == Cupola) MikseriPaneeli.Lahde = null;
        }

        /// <summary>DioraamaAanet.Avaa (true, ennen esilatausta) / Sulje (false). Mikseritila vain kehittäjälle.</summary>
        public static void LinnaTila(bool auki)
        {
            Lataa();
            DioraamaAanet.MikseriTila = auki && Asetukset.Kehittaja;
            if (auki)
            {
                DioraamaAanet.HuoneVaihtui -= Linna.HuoneVaihtui;
                DioraamaAanet.HuoneVaihtui += Linna.HuoneVaihtui;
                Linna.HuoneVaihtui(DioraamaAanet.NykyinenHuone);
                Sovella();
                MikseriPaneeli.Lahde = Linna;
            }
            else
            {
                DioraamaAanet.HuoneVaihtui -= Linna.HuoneVaihtui;
                if (MikseriPaneeli.Lahde == Linna) MikseriPaneeli.Lahde = null;
            }
        }

        // --- arvot ---------------------------------------------------------------------------------------------------

        static Dictionary<string, float> Voimassa => b ? muokattu : tallennettu;
        static float Arvo(Dictionary<string, float> d, string avain, float oletus) => d.TryGetValue(avain, out var v) ? v : oletus;

        static void AsetaMuokattu(string avain, float arvo)
        {
            muokattu[avain] = arvo;
            if (b) Sovella();
        }

        static void AsetaB(bool arvo)
        {
            if (b == arvo) return;
            b = arvo;
            Sovella();
        }

        /// <summary>Voimassa oleva arvojoukko (A tai B) soittimien kertoimiksi.</summary>
        static void Sovella()
        {
            var d = Voimassa;
            CupolaAani.HuminaVoima = CupolaHumina * Arvo(d, "cupola|humina", 100f) / 100f;
            CupolaAani.RadioVoima = CupolaRadio * Arvo(d, "cupola|radio", 100f) / 100f;
            // Väistö 100 % = nykyinen väistö, 0 % = ei väistöä: kerroin liukuu 1:stä perusväistöön.
            CupolaAani.HuminaVaisto = Mathf.LerpUnclamped(1f, CupolaHuminaVaisto, Arvo(d, "cupola|humina-vaisto", 100f) / 100f);
            CupolaAani.RadioVaisto = Mathf.LerpUnclamped(1f, CupolaRadioVaisto, Arvo(d, "cupola|radio-vaisto", 100f) / 100f);

            DioraamaAanet.HuoneKerroin.Clear(); DioraamaAanet.TaustaKerroin.Clear();
            DioraamaAanet.VaistoKerroin.Clear(); DioraamaAanet.KaikuKerroin.Clear();
            foreach (var pari in d)
            {
                var osat = pari.Key.Split('|');
                if (osat.Length != 3 || osat[0] != "linna") continue;
                string huone = osat[1], id = osat[2];
                if (id == "huone") DioraamaAanet.HuoneKerroin[huone] = pari.Value / 100f;
                else if (id == "vaisto") DioraamaAanet.VaistoKerroin[huone] = pari.Value / 100f;
                else if (id == "kaiku") DioraamaAanet.KaikuKerroin[huone] = pari.Value / 100f;
                else if (id.StartsWith("tausta:", StringComparison.Ordinal)) DioraamaAanet.TaustaKerroin[id.Substring(7)] = pari.Value / 100f;
            }
            DioraamaAanet.KaikuPois = Arvo(d, "linna|*|kaiku-ab", 1f) < 0.5f;
            DioraamaAanet.KaikunPituus = Arvo(d, "linna|*|pitka", 0f) >= 0.5f ? "pitka" : "lyhyt";
        }

        static void Lataa()
        {
            if (ladattu) return;
            ladattu = true;
            foreach (var rivi in PlayerPrefs.GetString(Avain, "").Split(';'))
            {
                int i = rivi.LastIndexOf('=');
                if (i > 0 && float.TryParse(rivi.Substring(i + 1), NumberStyles.Float, Inv, out var v)) tallennettu[rivi.Substring(0, i)] = v;
            }
            muokattu.Clear();
            foreach (var p in tallennettu) muokattu[p.Key] = p.Value;
        }

        static string Tallenna(string mika)
        {
            tallennettu.Clear();
            foreach (var p in muokattu) tallennettu[p.Key] = p.Value;
            PlayerPrefs.SetString(Avain, string.Join(";", tallennettu.Select(p => p.Key + "=" + p.Value.ToString("0.###", Inv))));
            PlayerPrefs.Save();
            string json = Json();
            string aika = DateTime.Now.ToString("HH.mm");
            Debug.Log("MATKAKIRJA aanimikseri: tallennettu " + json);
            if (Kaynti.Testiymparisto) return viimeTila = $"tallennettu {mika} {aika} (testi, ei lähetetty)";
            viimeTila = $"tallennettu {mika} {aika}, lähetetään…";
            var kentat = new List<(string, string)> { ("laji", ""), ("teksti", "ÄÄNIMIKSERI " + json), ("sivu", "Äänimikseri"), ("tarkenne", mika) };
            Palautekanava.Postita("/laheta", kentat, null, t =>
            {
                viimeTila = t.Ok ? $"tallennettu {mika} {aika}, lähetetty" : $"tallennettu {mika} {aika}, lähetys epäonnistui: {Palautekanava.Virheviesti(t, false)}";
                Debug.Log("MATKAKIRJA aanimikseri: " + viimeTila);
            });
            return viimeTila;
        }

        /// <summary>Koko tallennettu tila: { "versio":1, "cupola":{…}, "linna":{ "&lt;huone&gt;":{…}, "*":{…} } } (prosentit, kytkimet 0/1).</summary>
        static string Json()
        {
            var sb = new StringBuilder("{\"versio\":1");
            foreach (var ryhma in tallennettu.GroupBy(p => p.Key.Split('|')[0]).OrderBy(g => g.Key))
            {
                sb.Append(",\"").Append(ryhma.Key).Append("\":{");
                if (ryhma.Key == "cupola")
                    sb.Append(string.Join(",", ryhma.OrderBy(p => p.Key).Select(p => $"\"{p.Key.Split('|')[1]}\":{p.Value.ToString("0.###", Inv)}")));
                else
                    sb.Append(string.Join(",", ryhma.GroupBy(p => p.Key.Split('|')[1]).OrderBy(g => g.Key).Select(h =>
                        $"\"{h.Key}\":{{" + string.Join(",", h.OrderBy(p => p.Key).Select(p => $"\"{p.Key.Split('|')[2]}\":{p.Value.ToString("0.###", Inv)}")) + "}")));
                sb.Append('}');
            }
            return sb.Append('}').ToString();
        }

        static MikseriSaadin S(string id, string nimi, float min, float max, float arvo, string yksikko = "%", int desimaalit = 0) =>
            new MikseriSaadin { Id = id, Nimi = nimi, Min = min, Max = max, Arvo = arvo, Yksikko = yksikko, Desimaalit = desimaalit };

        // --- lähteet -------------------------------------------------------------------------------------------------

        public sealed class CupolaLahde : IMikseriLahde
        {
            public string Otsikko => "ISS · Cupola";
            public int Versio => 1;
            /// <summary>Joka kerta muokatuista arvoista (paneeli lukee vain rakentaessaan). Humina enintään 110 %:
            /// soitinsolmun voimakkuus on enintään 1 (perustaso 0,9).</summary>
            public IReadOnlyList<MikseriSaadin> Saatimet => new List<MikseriSaadin>
            {
                S("humina", "Humina", 0, 110, Arvo(muokattu, "cupola|humina", 100f)),
                S("radio", "Radio", 0, 200, Arvo(muokattu, "cupola|radio", 100f)),
                S("humina-vaisto", "Huminan väistö", 0, 200, Arvo(muokattu, "cupola|humina-vaisto", 100f)),
                S("radio-vaisto", "Radion väistö", 0, 100, Arvo(muokattu, "cupola|radio-vaisto", 100f)),
            };
            public void Aseta(string id, float arvo) => AsetaMuokattu("cupola|" + id, arvo);
            public bool B { get => b; set => AsetaB(value); }
            public string Tallenna() => AaniMikseri.Tallenna("cupola");
        }

        public sealed class LinnaLahde : IMikseriLahde
        {
            string huone = "";
            int versio = 1;
            /// <summary>Huoneessa kuullut taustaraidat (tahmea: säädin ei katoa, vaikka raita hiljenisi nollaan).</summary>
            readonly List<string> taustat = new List<string>();

            public string Otsikko => "Olavinlinna · " + (HuoneNimet.TryGetValue(huone, out var n) ? n : huone);
            public int Versio { get { PaivitaTaustat(); return versio; } }
            public IReadOnlyList<MikseriSaadin> Saatimet => Rakenna();
            public bool B { get => b; set => AsetaB(value); }
            public string Tallenna() => AaniMikseri.Tallenna(huone == "" ? "yleisnäkymä" : huone);

            public void HuoneVaihtui(string uusi)
            {
                uusi ??= "";
                if (uusi == huone) return;
                huone = uusi;
                taustat.Clear();
                versio++;
            }

            void PaivitaTaustat()
            {
                bool uusia = false;
                foreach (var t in DioraamaAanet.SoivatTaustat)
                    if (taustat.Count < 6 && !taustat.Contains(t.AaniId)) { taustat.Add(t.AaniId); uusia = true; }
                if (uusia) versio++;
            }

            string Avain(string id) => id == "kaiku-ab" || id == "pitka" ? "linna|*|" + id
                : id.StartsWith("tausta:", StringComparison.Ordinal) ? "linna|*|" + id : $"linna|{huone}|{id}";

            List<MikseriSaadin> Rakenna()
            {
                float A(string id, float oletus) => Arvo(muokattu, Avain(id), oletus);
                // Kaiku ensin (Natiivi-UI:n katselmus 1.10.: omistaja säätää juuri kaikua, näkyviin ilman vieritystä 45 %:n katolla),
                // sitten väistö ja taustat.
                var l = new List<MikseriSaadin>();
                if (KaikuHuoneet.Contains(huone))
                {
                    l.Add(S("kaiku-ab", "Kaiku", 0, 1, A("kaiku-ab", 1f), "", 0));
                    l.Add(S("kaiku", "Kaiun määrä", 0, 140, A("kaiku", 100f)));
                    l.Add(S("pitka", "Pitkä kaiku (holvi)", 0, 1, A("pitka", 0f), "", 0));
                }
                l.Add(S("vaisto", "Väistö puheessa", 0, 100, A("vaisto", 100f)));
                l.Add(S("huone", "Taustat yhteensä", 0, 200, A("huone", 100f)));
                foreach (var t in taustat) l.Add(S("tausta:" + t, RaidanNimi(t), 0, 200, A("tausta:" + t, 100f)));
                return l;
            }

            public void Aseta(string id, float arvo) => AsetaMuokattu(Avain(id), arvo);
        }

        /// <summary>Testikomento (ui aanimikseri …).</summary>
        public static string Komento(string loput)
        {
            Lataa();
            var osat = (loput ?? "").Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string k = osat.Length > 0 ? osat[0] : "tila";
            IMikseriLahde l = MikseriPaneeli.Lahde is CupolaLahde || MikseriPaneeli.Lahde is LinnaLahde ? MikseriPaneeli.Lahde : null;
            if (k == "cupola") { MikseriPaneeli.Lahde = l = Cupola; Sovella(); }
            else if (k == "linna") { Linna.HuoneVaihtui(DioraamaAanet.NykyinenHuone); MikseriPaneeli.Lahde = l = Linna; Sovella(); }
            else if (k == "aseta" && osat.Length > 2 && l != null && float.TryParse(osat[2], NumberStyles.Float, Inv, out var v))
            { l.Aseta(osat[1], v); l.B = true; }
            else if (k == "b" && osat.Length > 1) AsetaB(osat[1] == "1");
            else if (k == "tallenna" && l != null) l.Tallenna();
            string saatimet = l == null ? "-" : string.Join(", ", l.Saatimet.Select(s => $"{s.Id}={s.Arvo.ToString("0.#", Inv)}"));
            return $"aanimikseri: {(l == null ? "ei lähdettä" : l.Otsikko)} · {(b ? "B" : "A")} · {saatimet} · mikseritila {DioraamaAanet.MikseriTila}, "
                + $"kaiku {(DioraamaAanet.KaikuPois ? "pois" : DioraamaAanet.KaikunPituus)}, cupola humina {CupolaAani.HuminaVoima:0.00} radio {CupolaAani.RadioVoima:0.00}"
                + (viimeTila.Length > 0 ? " · " + viimeTila : "");
        }
    }
}
