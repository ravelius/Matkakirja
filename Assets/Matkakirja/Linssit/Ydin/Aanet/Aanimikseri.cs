// ÄÄNIMIKSERI JA ÄÄNIREKISTERI (omistaja 9.10.2026 klo 09.5x, sitova; Natiivi-UI vetää, Pelikoodari palvelin PR #4270): "Tuohon
// mikseriin saisi eritellä tarkemmin ne eri tehosteäänet. Eli tehosteilla voisi olla oma master-säädin, ja siinä voisi olla pieni väkänen,
// joka avaisi sitten vielä kaikki eri tehosteäänet yksitellen… kaikissa linsseissä ja peleissä … mikserillä pitää olla joku worker …
// tallentaa minun tekemät asetukset peliin kaikille käyttäjille … vain, kun on se kehittäjäkoodi päällä." Aamun TF 169 -palaute: tasot
// peli- ja linssikohtaisiksi.
//   konteksti  pallo, linna, iss, kartta, lautapelit, linssit (UI asettaa Nyt sen mukaan, mikä näkymä on auki)
//   ryhmä      puhe, repliikit, musiikki, tehosteet, maisema, saa, pulu (= vanhat Voima-säätimet)
//   ääni       rekisteröity tunnus kontekstissa (ryhmä vain mikserin ryhmittelyä varten); soittava koodi: Kerroin(ryhmä, id)
// Kertoimet lineaarisia 0–4, 1 = ennallaan (Pelikoodarin skeema 1). Taso = ryhmän perustaso × ryhmän kerroin × äänen kerroin.
// Arvo: kehittäjän oma muutos → yhteinen (worker, kaikille) → 1. Muoto (worker GET/POST ja välimuisti):
//   {"versio": n, "skeema": 1, "tasot": {"pallo": {"ryhmat": {"tehosteet": 0.8}, "aanet": {"lokit": 0.5}}}}
// Puhdas C#: Linssit-testit.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aanet
{
    public sealed class Aanimikseri
    {
        public static readonly string[] Kontekstit = { "pallo", "linna", "iss", "kartta", "lautapelit", "linssit" };
        /// <summary>Ryhmät mikserin järjestyksessä (omistaja 8.10. 17.5x: kertoja ja puhe, repliikit, musiikki, tehosteet, äänimaisema, sää, Pulu).</summary>
        public static readonly string[] Ryhmat = { "puhe", "repliikit", "musiikki", "tehosteet", "maisema", "saa", "pulu" };
        public const float MaxKerroin = 4f;

        /// <summary>Koko pelin mikseri (UI asettaa Nyt; soittava koodi lukee Kerroin).</summary>
        public static readonly Aanimikseri Yhteinen = new Aanimikseri();

        /// <summary>Ryhmän perustaso ennen kertoimia (UI: Asetukset.Oletus, joka lukee sisältöpaketin aanet.mikseri-oletukset).</summary>
        public Func<string, float> PerusTaso = Perus;
        /// <summary>Nykyinen konteksti (UI päivittää; oletus kartta).</summary>
        public string Nyt { get; private set; } = "kartta";
        /// <summary>Jokin taso tai konteksti muuttui (äänimoottorit päivittävät soivat äänet).</summary>
        public event Action Muuttui;

        // Avaimet: ryhmä "konteksti|ryhmä", ääni "konteksti#id".
        readonly Dictionary<string, float> yhteiset = new Dictionary<string, float>(StringComparer.Ordinal);
        readonly Dictionary<string, float> omat = new Dictionary<string, float>(StringComparer.Ordinal);
        // konteksti|ryhmä → id → nimi; klipit (ajonaikainen vahti: soiva klippi ilman rekisteröintiä)
        readonly Dictionary<string, SortedDictionary<string, string>> aanet = new Dictionary<string, SortedDictionary<string, string>>(StringComparer.Ordinal);
        readonly HashSet<string> klipit = new HashSet<string>(StringComparer.Ordinal);
        public int YhteisetVersio { get; private set; }

        public static string RyhmaAvain(string konteksti, string ryhma) => konteksti + "|" + ryhma;
        public static string AaniAvain(string konteksti, string id) => konteksti + "#" + id;

        /// <summary>Koodin perustaso ryhmälle (vanhat oletukset: puhe 0,9, musiikki 0,35, muut 1).</summary>
        public static float Perus(string ryhma) => ryhma == "puhe" ? 0.9f : ryhma == "musiikki" ? 0.35f : 1f;

        public void AsetaNyt(string konteksti)
        {
            if (string.IsNullOrEmpty(konteksti) || konteksti == Nyt) return;
            Nyt = konteksti;
            Muuttui?.Invoke();
        }

        float Arvo(string avain) => omat.TryGetValue(avain, out var o) ? o : yhteiset.TryGetValue(avain, out var y) ? y : 1f;

        /// <summary>Ryhmän kerroin (1 = oletus) ja ääni-kerroin kontekstissa.</summary>
        public float RyhmaKerroin(string konteksti, string ryhma) => Arvo(RyhmaAvain(konteksti, ryhma));
        public float AaniKerroin(string konteksti, string id) => Arvo(AaniAvain(konteksti, id));

        /// <summary>Ryhmän taso kontekstissa: perustaso × kerroin (rajattu 0…1, AudioSource.volume).</summary>
        public float Ryhma(string konteksti, string ryhma) => Math.Min(1f, PerusTaso(ryhma) * RyhmaKerroin(konteksti, ryhma));

        /// <summary>Taso nykyisessä kontekstissa: ryhmän taso × äänen kerroin (id null = vain ryhmä), rajattu 0…1.</summary>
        public float Kerroin(string ryhma, string id = null) =>
            Math.Min(1f, PerusTaso(ryhma) * RyhmaKerroin(Nyt, ryhma) * (string.IsNullOrEmpty(id) ? 1f : AaniKerroin(Nyt, id)));

        /// <summary>Kehittäjän muutos (0…4); sama arvo kuin ilman omaa muutosta poistaa oman muutoksen.</summary>
        public void Aseta(string avain, float kerroin)
        {
            kerroin = Math.Max(0f, Math.Min(MaxKerroin, (float)Math.Round(kerroin * 100f) / 100f));
            float ilman = yhteiset.TryGetValue(avain, out var y) ? y : 1f;
            if (Math.Abs(ilman - kerroin) < 0.001f) omat.Remove(avain); else omat[avain] = kerroin;
            Muuttui?.Invoke();
        }

        public bool OnOma(string avain) => omat.ContainsKey(avain);
        static bool Kontekstin(string avain, string konteksti) =>
            avain.StartsWith(konteksti + "|", StringComparison.Ordinal) || avain.StartsWith(konteksti + "#", StringComparison.Ordinal);
        public int OmiaMuutoksia(string konteksti) => omat.Keys.Count(k => Kontekstin(k, konteksti));

        /// <summary>Kontekstin omat muutokset pois (palaa yhteisiin).</summary>
        public void PalautaYhteiset(string konteksti)
        {
            foreach (var k in omat.Keys.Where(k => Kontekstin(k, konteksti)).ToList()) omat.Remove(k);
            Muuttui?.Invoke();
        }

        // --- rekisteri ---------------------------------------------------------------------------------------------------

        /// <summary>Ääni mikseriin: tunnus kontekstissa, ryhmä (mikserin väkäsen alle), näkyvä nimi ja klippien nimet (ajonaikainen vahti).</summary>
        public void Rekisteroi(string konteksti, string ryhma, string id, string nimi, params string[] klippiNimet)
        {
            if (string.IsNullOrEmpty(konteksti) || string.IsNullOrEmpty(ryhma) || string.IsNullOrEmpty(id)) return;
            var a = RyhmaAvain(konteksti, ryhma);
            if (!aanet.TryGetValue(a, out var l)) aanet[a] = l = new SortedDictionary<string, string>(StringComparer.Ordinal);
            l[id] = string.IsNullOrEmpty(nimi) ? id : nimi;
            klipit.Add(id);
            if (klippiNimet != null) foreach (var k in klippiNimet) if (!string.IsNullOrEmpty(k)) klipit.Add(k);
        }

        public IReadOnlyList<(string Id, string Nimi)> AanetRyhmassa(string konteksti, string ryhma) =>
            aanet.TryGetValue(RyhmaAvain(konteksti, ryhma), out var l) ? l.Select(kv => (kv.Key, kv.Value)).ToList() : new List<(string, string)>();

        /// <summary>Onko klippi tai tunnus rekisteröity jossain kontekstissa (ajonaikainen äänivahti).</summary>
        public bool Rekisteroity(string klippiTaiId) => !string.IsNullOrEmpty(klippiTaiId) && klipit.Contains(klippiTaiId);
        public int RekisteroityjaAania => aanet.Values.Sum(l => l.Count);

        // --- tallennus (Pelikoodarin skeema 1) -----------------------------------------------------------------------------

        /// <summary>Yhteiset tasot workerin vastauksesta tai välimuistista; false = väärä muoto (ennallaan). Tyhjä tasot = kaikki 1.</summary>
        public bool LueYhteiset(string json)
        {
            object o;
            try { o = MiniJson.Jasenna(json); } catch (FormatException) { return false; }
            if (!(o is Dictionary<string, object> j) || !(MiniJson.Kentta(j, "tasot") is Dictionary<string, object> t)) return false;
            yhteiset.Clear();
            foreach (var kk in t)
            {
                if (!(kk.Value is Dictionary<string, object> k)) continue;
                if (MiniJson.Kentta(k, "ryhmat") is Dictionary<string, object> r)
                    foreach (var kv in r) if (kv.Value is double d) yhteiset[RyhmaAvain(kk.Key, kv.Key)] = Rajaa(d);
                if (MiniJson.Kentta(k, "aanet") is Dictionary<string, object> a)
                    foreach (var kv in a) if (kv.Value is double d) yhteiset[AaniAvain(kk.Key, kv.Key)] = Rajaa(d);
            }
            YhteisetVersio = (int)(MiniJson.Luku(j, "versio") ?? 0);
            Muuttui?.Invoke();
            return true;
        }

        static float Rajaa(double d) => (float)Math.Max(0, Math.Min(MaxKerroin, d));

        /// <summary>
        /// "Tallenna kaikille" -runko: {"tasot": {...}, "pohjaVersio": n}. Yhteiset kaikista konteksteista sellaisinaan ja annetun kontekstin
        /// voimassa olevat kertoimet (ryhmät ja äänet, joilla on oma tai yhteinen arvo), joten muiden kontekstien yhteiset eivät katoa.
        /// </summary>
        public string TallennusJson(string konteksti)
        {
            var kaikki = new Dictionary<string, float>(yhteiset, StringComparer.Ordinal);
            foreach (var kv in omat) if (Kontekstin(kv.Key, konteksti)) kaikki[kv.Key] = kv.Value;
            var kontekstit = new SortedDictionary<string, (SortedDictionary<string, float> R, SortedDictionary<string, float> A)>(StringComparer.Ordinal);
            foreach (var kv in kaikki)
            {
                int p = kv.Key.IndexOf('|'), h = kv.Key.IndexOf('#');
                bool ryhma = p > 0 && (h < 0 || p < h);
                int i = ryhma ? p : h;
                if (i <= 0) continue;
                string k = kv.Key.Substring(0, i), n = kv.Key.Substring(i + 1);
                if (!kontekstit.TryGetValue(k, out var e)) kontekstit[k] = e = (new SortedDictionary<string, float>(StringComparer.Ordinal), new SortedDictionary<string, float>(StringComparer.Ordinal));
                (ryhma ? e.R : e.A)[n] = kv.Value;
            }
            var sb = new StringBuilder("{\"tasot\":{");
            bool ek = true;
            foreach (var kv in kontekstit)
            {
                if (!ek) sb.Append(',');
                ek = false;
                sb.Append('"').Append(kv.Key).Append("\":{\"ryhmat\":");
                Kartta(sb, kv.Value.R);
                sb.Append(",\"aanet\":");
                Kartta(sb, kv.Value.A);
                sb.Append('}');
            }
            return sb.Append("},\"pohjaVersio\":").Append(YhteisetVersio).Append('}').ToString();
        }

        static void Kartta(StringBuilder sb, SortedDictionary<string, float> d)
        {
            sb.Append('{');
            bool eka = true;
            foreach (var kv in d)
            {
                if (!eka) sb.Append(',');
                eka = false;
                sb.Append('"').Append(kv.Key).Append("\":").Append(kv.Value.ToString("0.##", CultureInfo.InvariantCulture));
            }
            sb.Append('}');
        }

        /// <summary>Onnistuneen tallennuksen jälkeen: kontekstin omat muutokset yhteisiksi ja uusi versio.</summary>
        public void Tallennettu(string konteksti, int uusiVersio)
        {
            foreach (var k in omat.Keys.Where(k => Kontekstin(k, konteksti)).ToList()) { yhteiset[k] = omat[k]; omat.Remove(k); }
            YhteisetVersio = uusiVersio;
            Muuttui?.Invoke();
        }

        /// <summary>Kehittäjän omat muutokset tallennusmerkkijonona ja takaisin (PlayerPrefs).</summary>
        public string OmatTalteen() => string.Join(";", omat.OrderBy(kv => kv.Key, StringComparer.Ordinal)
            .Select(kv => kv.Key + "=" + kv.Value.ToString("0.##", CultureInfo.InvariantCulture)));

        public void LueOmat(string s)
        {
            omat.Clear();
            if (!string.IsNullOrEmpty(s))
                foreach (var pari in s.Split(';'))
                {
                    int i = pari.LastIndexOf('=');
                    if (i > 0 && float.TryParse(pari.Substring(i + 1), NumberStyles.Float, CultureInfo.InvariantCulture, out var v))
                        omat[pari.Substring(0, i)] = Rajaa(v);
                }
            Muuttui?.Invoke();
        }

        /// <summary>Testit: tyhjä mikseri.</summary>
        public void Tyhjenna() { yhteiset.Clear(); omat.Clear(); aanet.Clear(); klipit.Clear(); YhteisetVersio = 0; Nyt = "kartta"; }
    }
}
