// HISTORIAMOOTTORI M-OSA HUONE 9: KOMERO JA ARKKU (Siirtoseppä 8.10.2026; pelattavuusmalli-olavinlinna.md 8.2 huone 9; Ydin Komero:
// Tiilet ja Kilpilukko, LS2 8.10.). Tiilet tiili:komero-N (raapaisut 2) paikkamerkkilaatikkoina, kunnes Linnanrakentajan malli tulee: Raavi veitsellä, toinen
// raapaisu irrottaa; ensimmäinen putoaa aina kalliolle (ääni 14 m, kolahdus 1,7 s myöhemmin), muut: liikkeessä nopea veto pudottaa,
// paikallaan hidas veto laskee komeroon. Toinen putoava 10 s:n sisällä → vartija kurkistaa (SeikkailuVartijat.Kurkistus 6 s, jähmety).
// Arkku (esine:arkku-komero, kilpi:arkku-1/2): Käännä kilpeä 15° kerrallaan (−90…90, kiertää), Avaa kokeilee kantta: 45° ±10° → auki,
// löytö (SeikkailuTapit.NaytaLoyto) ja kantele; väärä asento → kolahdus 6 m, ei rangaistusta. Kilpien kääntö näkyy mallissa vasta,
// kun arkun solmut ovat erikseen (nyt yksi mesh): ääni ja loki kertovat.
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuKomero : MonoBehaviour
    {
        public static SeikkailuKomero Aktiivinen { get; private set; }
        /// <summary>Komeron ydin vain luettavaksi (LS2:n vihjeportaat 6–10).</summary>
        public Komero Ydin => ydin;
        /// <summary>Arkku auki ja löytö kuitattu (huone 10 alkaa: hälytyskello, SeikkailuPako).</summary>
        public static event Action ArkkuAuki;
        public const float LahiM = 1.1f, PutoamisS = 1.7f;
        Komero ydin; readonly List<GameObject> tiiliGo = new List<GameObject>();
        Vector3? arkku; readonly Vector3[] kilvet = new Vector3[2]; bool kilpiaOn;
        Vector3 ulos = Vector3.forward;
        Action<string> kirjaa;

        public static void Luo(KavelyData d, Transform isa, Action<string> kirjaa)
        {
            Poista();
            var tm = new List<KavelyMerkki>();
            foreach (var m in d.Lajia("tiili")) tm.Add(m);
            KavelyMerkki am = null; foreach (var m in d.Lajia("esine")) if (m.Tunnus.StartsWith("arkku", StringComparison.Ordinal)) am = m;
            if (tm.Count == 0 && am == null) return;
            var go = new GameObject("Seikkailu komero") { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(isa, false);
            var k = go.AddComponent<SeikkailuKomero>(); k.kirjaa = kirjaa; Aktiivinen = k;
            tm.Sort((a, b) => string.CompareOrdinal(a.Tunnus, b.Tunnus));
            double tavoite = 45, sallittu = 10; int ki = 0;
            foreach (var m in d.Lajia("kilpi")) if (ki < 2) { k.kilvet[ki++] = new Vector3((float)m.X, (float)m.Y, (float)-m.Z); if (m.KaantoAste > 0) tavoite = m.KaantoAste; if (m.SallittuAste > 0) sallittu = m.SallittuAste; }
            k.ydin = new Komero(tm.Count, tavoite, sallittu);
            var sh = Shader.Find("Matkakirja/Linssit/DioraamaValaistu");
            var mat = sh != null ? new Material(sh) { name = "Tiili (paikkamerkki)" } : null;
            if (mat != null) mat.SetColor("_Vari", new Color(0.5f, 0.24f, 0.16f));
            foreach (var m in tm)
            {
                var t = GameObject.CreatePrimitive(PrimitiveType.Cube); t.name = "Tiili:" + m.Tunnus; t.layer = DioraamaNayttamo.Kerros;
                t.transform.SetParent(go.transform, false);
                t.transform.position = new Vector3((float)m.X, (float)m.Y, (float)-m.Z);
                if (m.KiertoY is double ky) t.transform.rotation = Quaternion.Euler(0f, (float)(-ky * 180 / Math.PI), 0f);
                t.transform.localScale = new Vector3(0.27f, 0.07f, 0.13f);
                if (mat != null) t.GetComponent<MeshRenderer>().sharedMaterial = mat;
                k.tiiliGo.Add(t);
                if (m.KiertoY is double ku) k.ulos = -new Vector3((float)Math.Sin(ku), 0f, (float)-Math.Cos(ku));
            }
            if (am != null) { k.arkku = new Vector3((float)am.X, (float)am.Y, (float)-am.Z); k.kilpiaOn = ki == 2; }
            // Käsittely käsin (pelattavuusmalli 6): kilpi kääntyy vedon mukana (x-asteet); napautus "Käännä" 15° kuten ennen.
            if (k.kilpiaOn)
                for (int i = 0; i < 2; i++)
                {
                    int kn = i;
                    SeikkailuKasittely.Lisaa(new SeikkailuKasittely.Kasiteltava
                    {
                        Nimi = "kilpi:arkku-" + (kn + 1), Paikka = () => k.kilvet[kn], Tarjolla = pl => k != null && k.LahinKilpi(pl) is int lk && (lk == 0 || lk == 1),
                        Kaanna = (pl, asteet, narahti) =>
                        {
                            if (k == null || k.ydin.Auki) return;
                            k.ydin.Lukko.Kaanna(kn + 1, asteet);
                            if (narahti) SeikkailuAanet.Soita("kivi-irtoaa", k.kilvet[kn], 0.5f, 1.4f);
                        },
                        Loppui = () => { if (k != null) k.kirjaa?.Invoke($"seikkailu: kilvet {k.ydin.Lukko.Kilpi1:F0}° / {k.ydin.Lukko.Kilpi2:F0}°"); },
                    });
                }
            kirjaa?.Invoke($"seikkailu: komero ({tm.Count} tiiltä, arkku {(am != null ? "kyllä" : "ei")}, kilpiä {(k.kilpiaOn ? 2 : 0)})");
        }

        // Kilvet ja kansi mallissa (LR v45a: arkku-komero.glb kansi → kilpi-1 / kilpi-2, kääntö paikallisen Y:n ympäri, kansi −X).
        Transform kilpi1, kilpi2, kansi; Quaternion kilpi1Perus, kilpi2Perus, kansiPerus; float kansiAuki;
        void Update()
        {
            ydin?.Tiilet.Paivita(Time.deltaTime);
            var es = SeikkailuEsineet.Aktiivinen;
            if (kilpi1 == null && es != null)
            {
                kilpi1 = es.Solmu("arkku-komero", "kilpi-1"); kilpi2 = es.Solmu("arkku-komero", "kilpi-2"); kansi = es.Solmu("arkku-komero", "kansi");
                if (kilpi1 != null) kilpi1Perus = kilpi1.localRotation;
                if (kilpi2 != null) kilpi2Perus = kilpi2.localRotation;
                if (kansi != null) kansiPerus = kansi.localRotation;
            }
            if (ydin == null) return;
            // Kilvet kääntyvät toisiaan kohti (Kilpi1 myötä, Kilpi2 vastaan; TULKINTA, kunnes LR:n extras kaantoakseli luetaan).
            if (kilpi1 != null) kilpi1.localRotation = kilpi1Perus * Quaternion.Euler(0f, (float)ydin.Lukko.Kilpi1, 0f);
            if (kilpi2 != null) kilpi2.localRotation = kilpi2Perus * Quaternion.Euler(0f, -(float)ydin.Lukko.Kilpi2, 0f);
            if (kansi != null) { kansiAuki = Mathf.MoveTowards(kansiAuki, ydin.Auki ? 1f : 0f, Time.deltaTime / 1.2f); kansi.localRotation = kansiPerus * Quaternion.Euler(-100f * Mathf.SmoothStep(0f, 1f, kansiAuki), 0f, 0f); }
        }

        int LahinTiili(SeikkailuPelaaja p)
        {
            int paras = -1; float pk = SeikkailuEsineet.ValitsinAste;
            for (int i = 0; i < tiiliGo.Count; i++)
            {
                if (ydin.Tiilet.Irti(i) || tiiliGo[i] == null) continue;
                var c = tiiliGo[i].transform.position;
                if ((c - (p.transform.position + Vector3.up * 1.2f)).sqrMagnitude > LahiM * LahiM * 1.6f) continue;
                float kulma = p.Silmat != null ? Vector3.Angle(p.Silmat.forward, c - p.Silmat.position) : 0f;
                if (kulma < pk) { pk = kulma; paras = i; }
            }
            return paras;
        }

        int LahinKilpi(SeikkailuPelaaja p)
        {
            if (!kilpiaOn || ydin.Auki || !(arkku is Vector3 a) || !ydin.ArkkuUlottuvilla) return -1;
            if ((a - p.transform.position).sqrMagnitude > 1.6f * 1.6f) return -1;
            if (p.Silmat == null) return 0;
            float k0 = Vector3.Angle(p.Silmat.forward, kilvet[0] - p.Silmat.position), k1 = Vector3.Angle(p.Silmat.forward, kilvet[1] - p.Silmat.position);
            return Mathf.Min(k0, k1) > 25f ? 2 : k0 <= k1 ? 0 : 1;   // 2 = katse arkkuun (kansi)
        }

        /// <summary>Toimintonapin verbi (Raavi, Käännä, Avaa) tai null; SeikkailuEsineet kysyy, kun kädet ovat vapaat.</summary>
        public string Verbi(SeikkailuPelaaja p)
        {
            if (p == null || ydin == null) return null;
            if (LahinTiili(p) >= 0) return "Raavi";
            int k = LahinKilpi(p);
            return k == 0 || k == 1 ? "Käännä" : k == 2 ? "Avaa" : null;
        }

        public bool Toimi(SeikkailuPelaaja p)
        {
            int ti = LahinTiili(p);
            if (ti >= 0)
            {
                var go = tiiliGo[ti]; var c = go.transform.position;
                p.KasiEle("raapaisu");
                SeikkailuAanet.Soita("raapaisu", c, 0.8f, UnityEngine.Random.Range(0.92f, 1.08f));
                var tulos = ydin.Raavi(ti, p.Tila.Vauhti);
                kirjaa?.Invoke($"seikkailu: tiili {ti + 1}: {tulos}");
                if (tulos == TiiliTulos.Putosi || tulos == TiiliTulos.Komeroon) SeikkailuTallentaja.Aktiivinen?.Tallenna("m: tiili " + (ti + 1));
                if (tulos == TiiliTulos.Putosi) StartCoroutine(Putoaa(go));
                else if (tulos == TiiliTulos.Komeroon) { SeikkailuAanet.Soita("kivi-lasku", c, 0.6f); go.transform.position = c - ulos * 0.35f + Vector3.down * 0.05f; }
                if (ydin.Tiilet.Kurkistaa) { ydin.Tiilet.Kurkistaa = false; SeikkailuVartijat.Kurkistus(c + Vector3.up * 2.5f, 6f); }
                return true;
            }
            int k = LahinKilpi(p);
            if (k == 0 || k == 1)
            {
                double uusi = ydin.KaannaKilpea(k + 1);
                p.KasiEle("raapaisu");
                SeikkailuAanet.Soita("kivi-irtoaa", kilvet[k], 0.4f, 1.6f);
                kirjaa?.Invoke($"seikkailu: kilpi {k + 1} → {uusi:F0}°");
                return true;
            }
            if (k == 2)
            {
                var a = arkku.Value;
                if (ydin.Avaa() == KilpiTulos.Auki) StartCoroutine(Auki(p, a));
                else { SeikkailuAanet.Soita("kivi-kolahdus", a + Vector3.up * 0.4f, 0.6f, 1.2f); SeikkailuVartijat.Aani(a, Kilpilukko.KolahdusM); kirjaa?.Invoke("seikkailu: arkku ei aukea (kolahdus)"); }
                p.KasiEle("poiminta");
                return true;
            }
            return false;
        }

        IEnumerator Putoaa(GameObject go)
        {
            // Tiili kallistuu ulos ja putoaa kalliolle (14 m alas); kolahdus kuuluu vartijoille 14 m.
            var rb = go.AddComponent<Rigidbody>(); rb.mass = 2f; rb.linearVelocity = ulos * 1.2f; rb.angularVelocity = UnityEngine.Random.insideUnitSphere * 4f;
            yield return new WaitForSeconds(PutoamisS);
            var c = go != null ? go.transform.position : transform.position;
            SeikkailuAanet.Soita("kivi-kolahdus", c, 1f, 0.7f); SeikkailuVartijat.Aani(c, Tiilet.PutoaaM);
            if (go != null) Destroy(go, 2f);
        }

        IEnumerator Auki(SeikkailuPelaaja p, Vector3 a)
        {
            SeikkailuAanet.Soita("luukku-narahdus", a + Vector3.up * 0.4f, 0.8f);
            kirjaa?.Invoke("seikkailu: arkku auki (kilvet 45° toisiaan kohti)");
            SeikkailuTallentaja.Aktiivinen?.Tallenna("m: arkku auki");
            yield return new WaitForSeconds(0.8f);
            SeikkailuAanet.Soita("hopea-kilahdus", a + Vector3.up * 0.4f, 0.8f);
            SeikkailuAanet.Soita("loyto-kantele", p.transform.position + Vector3.up * 1.6f, 0.8f);
            var t = typeof(SeikkailuKomero).Assembly.GetType("Matkakirja.Natiivi.SeikkailuTapit");
            var m = t?.GetMethod("NaytaLoyto", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static);
            if (m == null) { kirjaa?.Invoke("seikkailu: löytö: SeikkailuTapit.NaytaLoyto puuttuu"); ArkkuAuki?.Invoke(); yield break; }
            // Teksti on paikkamerkki (M-osan käsikirjoitus ja Sisältökirjurin tarkistus puuttuvat).
            try { m.Invoke(null, new object[] { "Kellotornin arkku", "Arkun pohjalla kuunvalossa hopea välkkyy.", null, null, (Action)(() => { kirjaa?.Invoke("seikkailu: arkun löytö kuitattu"); ArkkuAuki?.Invoke(); }) }); }
            catch (Exception e) { kirjaa?.Invoke("seikkailu: löytö: " + (e.InnerException?.Message ?? e.Message)); ArkkuAuki?.Invoke(); }
        }

        /// <summary>Pelaaja komeron luona (huone 9: arkun tai tiilien 2,5 m:n säteellä).</summary>
        public bool Lahella(Vector3 p)
        {
            if (arkku is Vector3 a && (a - p).sqrMagnitude < 2.5f * 2.5f) return true;
            foreach (var t in tiiliGo) if (t != null && (t.transform.position - p).sqrMagnitude < 2.5f * 2.5f) return true;
            return false;
        }

        public void TaytaM(MTila m)
        {
            if (ydin == null) return;
            for (int i = 0; i < ydin.Tiilet.Maara && i < 30; i++) if (ydin.Tiilet.Irti(i)) m.Tiilet |= 1 << i;
            m.Kilpi1 = ydin.Lukko.Kilpi1; m.Kilpi2 = ydin.Lukko.Kilpi2; m.Arkku = ydin.Auki;
        }

        public void PalautaM(MTila m)
        {
            if (ydin == null) return;
            for (int i = 0; i < ydin.Tiilet.Maara && i < 30; i++)
                if ((m.Tiilet & (1 << i)) != 0) { ydin.Tiilet.AsetaIrti(i); if (i < tiiliGo.Count && tiiliGo[i] != null) tiiliGo[i].SetActive(false); }
            ydin.Lukko.Kaanna(1, m.Kilpi1 - ydin.Lukko.Kilpi1); ydin.Lukko.Kaanna(2, m.Kilpi2 - ydin.Lukko.Kilpi2);
            if (m.Arkku) ydin.Lukko.Kokeile();
            kirjaa?.Invoke($"seikkailu: jatko: komero (tiilet {m.Tiilet}, kilvet {m.Kilpi1:F0}/{m.Kilpi2:F0}, arkku {(ydin.Auki ? "auki" : "kiinni")})");
        }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }
        void OnDestroy() { if (Aktiivinen == this) Aktiivinen = null; SeikkailuKasittely.Poista("kilpi:arkku-1"); SeikkailuKasittely.Poista("kilpi:arkku-2"); }
    }
}
