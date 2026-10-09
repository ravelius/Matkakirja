// HISTORIAMOOTTORI: PYSTYLEIKKEEN TEHOSTEET (Siirtoseppä 7.10.2026; E3-käsikirjoitus kohta 6 "Äänet"; CC0/PD-lähteet, LAHTEET.md
// paketissa). Manifest media.matkakirja.app/seikkailu/<rakennus>/aanet-e3-v1/manifest.json { aanet[] { tunnus, aani, kesto_s, silmukka } };
// ääni haetaan ensimmäisellä soitolla ja pidetään muistissa. Soitto 3D:nä kuulokehyksestä (SeikkailuKuulija: kuulostaa olan yli
// -kamerasta); silmukat (sydän, tuuli) omina lähteinään, joita kutsuja ohjaa (Silmukka(tunnus, paalla, paikka)).
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuAanet : MonoBehaviour
    {
        public static SeikkailuAanet Aktiivinen { get; private set; }
        sealed class Aani { public string Tunnus, Polku; public bool Silmukka, Pakattu; public AudioClip Klippi; public bool Haussa; }
        readonly Dictionary<string, Aani> aanet = new Dictionary<string, Aani>(StringComparer.Ordinal);
        readonly Dictionary<string, AudioSource> silmukat = new Dictionary<string, AudioSource>(StringComparer.Ordinal);
        string juuri; Action<string> kirjaa;
        public bool Valmis { get; private set; }

        public static SeikkailuAanet Luo(Transform isa, string manifestUrl, Action<string> kirjaa)
        {
            string j = manifestUrl.Substring(0, manifestUrl.LastIndexOf('/') + 1);
            if (Aktiivinen != null && Aktiivinen.juuri == j) return Aktiivinen;
            Poista();
            var go = new GameObject("Seikkailu äänet"); go.transform.SetParent(isa, false);
            var a = go.AddComponent<SeikkailuAanet>(); a.juuri = j; a.kirjaa = kirjaa; Aktiivinen = a;
            a.StartCoroutine(a.Lataa(manifestUrl));
            return a;
        }

        /// <summary>Toinen manifesti samaan pankkiin (8.10.: aanet-fp-v1, pelattavuusmallin kohta 10: askeleet oljella/soralla/vedessä,
        /// löytömerkki); puuttuva manifesti vain lokiin, tunnukset eivät korvaa jo ladattuja.</summary>
        /// <param name="vain">Vain nämä tunnukset (iso yhteinen manifest, esim. sonniss-aanet-v2: muut silmukat eivät vie muistia); null = kaikki.</param>
        public static void LisaaManifest(string manifestUrl, params string[] vain)
        {
            var a = Aktiivinen; if (a == null || string.IsNullOrEmpty(manifestUrl)) return;
            a.StartCoroutine(a.Lataa(manifestUrl, vain != null && vain.Length > 0 ? new HashSet<string>(vain) : null));
        }

        /// <summary>Iso pankki (olavinlinna-soundly-v1, 205 ääntä, ~14 min; Pelikoodari 9.10.): klipit pakattuina muistiin (MP3, ~14 Mt;
        /// purettuna ~150 Mt), ei mikserirekisteriin omina riveinään: muunnelmat soivat korvattavan tunnuksen nimellä ja tasolla
        /// (Korvaavat).</summary>
        public static void LisaaPankki(string manifestUrl, params string[] vain)
        {
            var a = Aktiivinen; if (a == null || string.IsNullOrEmpty(manifestUrl)) return;
            a.StartCoroutine(a.Lataa(manifestUrl, vain != null && vain.Length > 0 ? new HashSet<string>(vain) : null, pankki: true));
        }

        static string Lyhyt(string url) { int i = url.LastIndexOf('/'); int k = i > 0 ? url.LastIndexOf('/', i - 1) : -1; return k >= 0 ? url.Substring(k + 1) : url; }

        IEnumerator Lataa(string url, HashSet<string> vain = null, bool pankki = false)
        {
            using var q = UnityWebRequest.Get(url + "?v=1"); q.timeout = 20;
            yield return q.SendWebRequest();
            if (q.result != UnityWebRequest.Result.Success) { kirjaa?.Invoke($"seikkailu: tehosteet: manifest ei latautunut ({q.error}, {Lyhyt(url)})"); yield break; }
            string pohja = url.Substring(0, url.LastIndexOf('/') + 1);
            object j; try { j = MiniJson.Jasenna(q.downloadHandler.text); } catch (Exception e) { kirjaa?.Invoke("seikkailu: tehosteet: " + e.Message); yield break; }
            foreach (var x in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.ObjektiTaiNull(j), "aanet")))
            {
                var o = MiniJson.ObjektiTaiNull(x); string t = MiniJson.Teksti(o, "tunnus");
                string polku = MiniJson.Teksti(o, "aani");
                if (!string.IsNullOrEmpty(t) && !aanet.ContainsKey(t) && !string.IsNullOrEmpty(polku) && (vain == null || vain.Contains(t)))
                {
                    aanet[t] = new Aani { Tunnus = t, Polku = pohja + polku, Silmukka = MiniJson.Kentta(o, "silmukka") is bool b && b, Pakattu = pankki };
                    if (!pankki) Rekisteroi(Ryhma(t), t, "Tehoste:" + t);
                }
            }
            if (pankki)
            {
                // Äänivahti (MikseriPalvelin): pankin klipit rekisteröidään korvattavan tunnuksen ja pelaajan askelten alle.
                foreach (var kv in Korvaavat) Rekisteroi(Ryhma(kv.Key), kv.Key, Array.ConvertAll(kv.Value, v => "Tehoste:" + v));
                var askeleet = new List<string>();
                foreach (var t in aanet.Keys) if (t.StartsWith("askel-", StringComparison.Ordinal) || t.StartsWith("hiipiminen-", StringComparison.Ordinal)) askeleet.Add("Tehoste:" + t);
                Rekisteroi("tehosteet", SeikkailuVartijat.PelaajanAskeleet, askeleet.ToArray());
            }
            Valmis = true;
            kirjaa?.Invoke($"seikkailu: tehosteet {aanet.Count} ({Lyhyt(url)})");
            foreach (var a in aanet.Values) StartCoroutine(Hae(a));   // pienet paketit puretaan heti muistiin, pankki pakattuna (Aani.Pakattu)
        }

        IEnumerator Hae(Aani a)
        {
            if (a.Klippi != null || a.Haussa || string.IsNullOrEmpty(a.Polku)) yield break;
            a.Haussa = true;
            using var p = UnityWebRequestMultimedia.GetAudioClip(a.Polku, AudioType.MPEG);
            var dh = (DownloadHandlerAudioClip)p.downloadHandler; dh.streamAudio = false; dh.compressed = a.Pakattu;
            yield return p.SendWebRequest();
            var c = p.result == UnityWebRequest.Result.Success ? DownloadHandlerAudioClip.GetContent(p) : null;
            if (c != null) c.name = "Tehoste:" + a.Tunnus;
            // Silmukat ja askeleet: LAME-tagi saumattomalle liitokselle (SaumatonSilmukka; iOS-FMOD ei leikkaa kooderiviivettä), ennen käyttöönottoa.
            if (c != null && (a.Silmukka || a.Tunnus.StartsWith("askel", StringComparison.Ordinal))) yield return SaumatonSilmukka.HaeTagi(a.Polku, c);
            a.Klippi = c; a.Haussa = false;
        }

        /// <summary>Satunnainen ladattu muunnelma (sonniss-aanet-v4: lukko-ulko-1-a/b …), muuten vara.</summary>
        public static void SoitaJokin(string[] tunnukset, string vara, Vector3 paikka, float voimakkuus = 1f, float savel = 1f)
        {
            int n = 0; foreach (var t in tunnukset) if (Klippi(t) != null) n++;
            if (n == 0) { if (vara != null) Soita(vara, paikka, voimakkuus, savel); return; }
            int valinta = UnityEngine.Random.Range(0, n);
            foreach (var t in tunnukset) if (Klippi(t) != null && valinta-- == 0) { Soita(t, paikka, voimakkuus); return; }
        }
        public static readonly string[] LukkoAuki = { "lukko-ulko-1-a", "lukko-ulko-1-b", "lukko-ulko-2-a", "lukko-ulko-2-b" },
            LukkoRavistus = { "lukko-ravistus" }, LukkoRaapaisu = { "lukko-raapaisu-a", "lukko-raapaisu-b" },
            // sonniss-aanet-v4: puuovi-narina-1 poistettiin (ei ovi), joten tavallinen ovi narisee samalla paksun puuoven narinalla.
            OviNarina = { "puuovi-narina-2-a", "puuovi-narina-2-b" }, PaksuOviNarina = { "puuovi-narina-2-a", "puuovi-narina-2-b" },
            RaskasOviAvain = { "raskas-ovi-avain-a", "raskas-ovi-avain-b" }, Kolikot = { "kolikot-1", "kolikot-2" };

        /// <summary>M-osa (aanet-fp-v2): uusi tunnus, jos ladattu, muuten vara (olemassa oleva ääni).</summary>
        public static void SoitaTaiVara(string tunnus, string vara, Vector3 paikka, float voimakkuus = 1f, float savel = 1f)
        {
            if (Klippi(tunnus) != null) Soita(tunnus, paikka, voimakkuus);
            else if (vara != null) Soita(vara, paikka, voimakkuus, savel);
        }

        /// <summary>Kertaääni paikassa (Unity, dioraaman koordinaatit). Puuttuva tai lataamaton tunnus ohitetaan hiljaa. Jos tunnukselle on
        /// ladattu Soundly-muunnelmia (Korvaavat), soi satunnainen niistä korvattavan tunnuksen mikseritasolla.</summary>
        public static void Soita(string tunnus, Vector3 paikka, float voimakkuus = 1f, float savel = 1f)
        {
            var s = Aktiivinen; if (s == null) return;
            var klippi = Muunnelma(tunnus);
            if (klippi == null) { if (!s.aanet.TryGetValue(tunnus, out var a) || a.Klippi == null) return; klippi = a.Klippi; }
            else KirjaaPankki(tunnus, klippi);
            var l = SeikkailuKuulija.Lahde("Tehoste:" + tunnus, 2f, 25f);
            SeikkailuKuulija.Aseta(l, paikka); l.clip = klippi; l.volume = voimakkuus * MikserinTaso(tunnus); l.pitch = savel; l.Play();
            Destroy(l.gameObject, klippi.length / Mathf.Max(0.1f, savel) + 0.2f);
        }

        /// <summary>
        /// SOUNDLY-KORVAAVAT (olavinlinna-soundly-v1, Pelikoodarin kuratoima vuodelle 1499; Siirtoseppä 9.10.): vanha tunnus → Soundly-muunnelmat,
        /// valittu alkuperäisten kuvausten mukaan vain varmat vastineet. Puuttuva pankki = vanha ääni ennallaan. Askeleet: Askeleet(pinta).
        /// </summary>
        public static readonly Dictionary<string, string[]> Korvaavat = new Dictionary<string, string[]>(StringComparer.Ordinal)
        {
            ["avain-lukko"] = Sarja("avain", 1, 4), ["avainnippu"] = Sarja("avain", 7, 12), ["loyto-kantele"] = Sarja("loyto", 1, 5),
            // sydan-silmukka-02 (laatu-korvaajat-v1, 58 BPM): Soundlyn -01 oli lääketieteellinen ultraääni, eikä sitä kytketä.
            ["sydan"] = new[] { "sydan-silmukka-02" }, ["tuuli-rako"] = Sarja("tuuli-rako", 1, 3),
            ["tarjotin"] = Sarja("keittio", 1, 4), ["kulho-poyta"] = new[] { "keittio-05", "keittio-08" }, ["kauha"] = Sarja("keittio", 6, 7),
            ["luuta"] = Sarja("keittio", 9, 12), ["nauris"] = Sarja("ruoka", 1, 6), ["savipurkki"] = Sarja("savi", 1, 8),
            ["patapino"] = Sarja("astiat", 1, 3), ["vesisanko"] = new[] { "astiat-04", "astiat-05", "astiat-08" },
            ["viitta"] = new[] { "kangas-05", "kangas-06", "kangas-08" }, ["varusteet"] = Sarja("varuste", 1, 6), ["hanska"] = Sarja("varuste", 13, 14),
            ["koysi-otto"] = Sarja("koysi", 7, 8), ["koysi-lasku"] = Sarja("koysi", 9, 10), ["koysi-kiinnitys"] = Sarja("koysi", 1, 6),
            ["uinti"] = new[] { "vesi-03", "vesi-04", "vesi-08" }, ["sukellus"] = Sarja("vesi", 5, 7),
            // koira (aanet-lapi-v1) oli 25 s:n Freesound-esikuuntelu, jossa toisto kuuluu (Pelikoodari 9.10.) → Soundlyn kaukainen koira.
            ["koira"] = Sarja("yo", 1, 2),
        };
        static string[] Sarja(string pohja, int a, int b) { var t = new string[b - a + 1]; for (int i = a; i <= b; i++) t[i - a] = $"{pohja}-{i:00}"; return t; }

        /// <summary>Lokiin kerran tunnusta kohden, että Soundly-pankki soi (kuva-arkin äänitarkistus: pankki eikä vara-ääni).</summary>
        public static void KirjaaPankki(string tunnus, AudioClip klippi)
        {
            var s = Aktiivinen; if (s == null || klippi == null || !s.pankkiKirjattu.Add(tunnus)) return;
            s.kirjaa?.Invoke($"seikkailu: soundly {tunnus} → {klippi.name}");
        }
        readonly HashSet<string> pankkiKirjattu = new HashSet<string>(StringComparer.Ordinal);

        /// <summary>Satunnainen ladattu Soundly-muunnelma tunnukselle, tai null.</summary>
        public static AudioClip Muunnelma(string tunnus) => tunnus != null && Korvaavat.TryGetValue(tunnus, out var v) ? Jokin(v) : null;
        static AudioClip Jokin(string[] tunnukset)
        {
            int n = 0; foreach (var t in tunnukset) if (Klippi(t) != null) n++;
            if (n == 0) return null;
            int valinta = UnityEngine.Random.Range(0, n);
            foreach (var t in tunnukset) { var k = Klippi(t); if (k != null && valinta-- == 0) return k; }
            return null;
        }

        /// <summary>Pelaajan askel kertaäänenä (Soundly askel-<pinta>-01…08, märkä maa askel-multa-01…04); null = ei pankkia tälle pinnalle
        /// (puu ja laituri jäävät silmukoiksi).</summary>
        public static AudioClip Askel(string pinta, bool marka)
        {
            string pohja = marka && (pinta == "kivi" || pinta == "sora") ? "askel-multa" : pinta == "kivi" || pinta == "porras" || pinta == "olki" || pinta == "sora" || pinta == "vesi" ? "askel-" + pinta : null;
            return pohja == null ? null : Jokin(Sarja(pohja, 1, pohja == "askel-multa" ? 4 : 8));
        }
        /// <summary>Hiivinnän vaatteen kahina askeleen päälle (hiipiminen-01…06).</summary>
        public static AudioClip Kahina() => Jokin(Kahinat);
        // hiipiminen-10 (laatu-korvaajat-v1) korvaa -08:n, joka kuulosti röyhtäykseltä; 07–09 ovat kiven raapaisuja eivätkä kuulu kahinaan.
        static readonly string[] Kahinat = { "hiipiminen-01", "hiipiminen-02", "hiipiminen-03", "hiipiminen-04", "hiipiminen-05", "hiipiminen-06", "hiipiminen-10" };

        // ÄÄNIREKISTERI (omistaja 9.10.2026 klo 09.5x, Natiivi-UI:n konteksti-mikseri): jokainen linnan ääni rekisteröidään kontekstiin
        // "linna" (ryhmä, tunnus, näkyvä nimi, klippien nimet äänivahdille) ja soi tasolla perus × Kerroin(ryhmä, tunnus).
        public const string Konteksti = "linna";
        static Matkakirja.Linssit.Aanet.Aanimikseri M => Matkakirja.Linssit.Aanet.Aanimikseri.Yhteinen;
        /// <summary>Mikserin taso ryhmälle ja äänelle (ryhmän perustaso × ryhmän kerroin × äänen kerroin, enintään 1).</summary>
        public static float Taso(string ryhma, string id) => M.Kerroin(ryhma, id);
        /// <summary>Pelkkä äänen oma kerroin (silmukat, joiden ryhmätason Aanisoittimen pooli jo kertoo).</summary>
        public static float AanenKerroin(string id) => M.AaniKerroin(M.Nyt, id);
        public static void Rekisteroi(string ryhma, string id, params string[] klipit) => M.Rekisteroi(Konteksti, ryhma, id, Nimi(id), klipit);
        /// <summary>Näkyvä nimi tunnuksesta: "lukko-ulko-1-a" → "Lukko ulko 1 a".</summary>
        public static string Nimi(string id) => string.IsNullOrEmpty(id) ? id : char.ToUpperInvariant(id[0]) + id.Substring(1).Replace('-', ' ');
        /// <summary>Tehosteen ryhmä: sää (tuuli, sade …), maisema (SeikkailuSaden taustat: yölinnut, satama …), muuten tehosteet.</summary>
        public static string Ryhma(string tunnus) => Matkakirja.Linssit.Seikkailu.AaniLuokka.OnkoSaa(tunnus) ? "saa"
            : Array.IndexOf(SeikkailuSade.Tunnukset, tunnus) >= 0 ? "maisema" : "tehosteet";

        /// <summary>☰-mikseri: tehosteen taso rekisterin kautta (ryhmä tunnuksesta).</summary>
        public static float MikserinTaso(string tunnus) => Taso(Ryhma(tunnus), tunnus);

        /// <summary>Ladattu klippi tunnuksella tai null (pelaajan askeleet valitsevat pinnan äänitteen).</summary>
        public static AudioClip Klippi(string tunnus) => tunnus != null && Aktiivinen != null && Aktiivinen.aanet.TryGetValue(tunnus, out var a) ? a.Klippi : null;

        /// <summary>Silmukka päälle tai pois (sydän, tuuli); paikka päivitetään joka kutsulla.</summary>
        public static void Silmukka(string tunnus, bool paalla, Vector3 paikka, float voimakkuus = 1f, float savel = 1f)
        {
            var s = Aktiivinen; if (s == null) return;
            if (!s.silmukat.TryGetValue(tunnus, out var l) || l == null)
            {
                if (!paalla) return;
                var klippi = Muunnelma(tunnus);   // Soundly-silmukka (sydän, tuulen rako), valitaan kerran
                if (klippi == null) { if (!s.aanet.TryGetValue(tunnus, out var a) || a.Klippi == null) return; klippi = a.Klippi; }
                else KirjaaPankki(tunnus, klippi);
                l = SeikkailuKuulija.Lahde("Silmukka:" + tunnus, 2f, 25f); l.clip = klippi; l.loop = true; s.silmukat[tunnus] = l;
                SaumatonSilmukka.Kiinnita(l);   // ~51 ms katko saumassa pois (juna 174)
            }
            SeikkailuKuulija.Aseta(l, paikka); l.volume = voimakkuus * MikserinTaso(tunnus); l.pitch = savel;
            if (paalla && !l.isPlaying) l.Play(); else if (!paalla && l.isPlaying) l.Stop();
        }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }

        void OnDestroy()
        {
            if (Aktiivinen == this) Aktiivinen = null;
            foreach (var l in silmukat.Values) if (l != null) Destroy(l.gameObject);
            foreach (var a in aanet.Values) if (a.Klippi != null) Destroy(a.Klippi);
        }
    }
}
