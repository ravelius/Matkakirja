// HISTORIAMOOTTORI M-OSA HUONE 10: PAKO (Siirtoseppä 8.10.2026; pelattavuusmalli-olavinlinna.md 8.2 huone 10 ja kohta 7).
// Kulku: arkku auki → hälytyskello (kaikki valppaiksi) → köysi kramppiin (koysi:krampi-komero) → köysilasku takakuvassa (Ytimen Kiipeily
// 1 m:n otteina, lyhty pyyhkäisee puolivälissä 2 s:n varoituksella) → kallio ensimmäisessä persoonassa (reitti:pako-1…5) → kamera:K4
// (sukellus, kaukokuva 4 s) → uinti takakuvassa 12 s veneelle (vene:pako) → rannan vartija pitää kiinnitysköydestä: Katkaise (tai Töytäise,
// omistajan päätös 1) → K5 (virta vie veneen sumuun, 12 s) → valmis. Aikaraja: kalliolla 20 s kellon alusta rannan soihtuvartijat esiin
// (partio:ranta, SeikkailuVartijat.Odottavat), 45 s → kiinni (lähin vartija vie tyrmään). Ohjatut jaksot SeikkailuPelaaja.Ohjattu-kutsulla.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuPako : MonoBehaviour
    {
        public static SeikkailuPako Aktiivinen { get; private set; }
        public const float KramppiM = 1.6f, K4M = 2.5f, RantaEsiinS = 20f, MyohassaS = 45f, K4S = 4f, UintiS = 12f, KoysiS = 10f, K5S = 12f;
        enum Vaihe { Odottaa, Kello, Lasku, Kallio, K4, Uinti, Koysi, K5, Valmis }
        Vaihe vaihe = Vaihe.Odottaa;
        Vector3 krampi, pako1, k4, k4Katse, k5, k5Katse, vene, koysi; bool k4On, k5On, veneOn;
        float kello = -1f, t; Action<string> kirjaa;
        /// <summary>Pako päättyi (K5:n jälkeen): sovitin voi viedä drone-näkymään ja tietokerrokseen.</summary>
        public static event Action Valmis;
        /// <summary>Toimintonapin verbi ohjatun jakson aikana (SeikkailuEsineet lukee) ja sen teko.</summary>
        public static string OhjattuVerbi;
        public static Action OhjattuToimi;

        static Vector3 U(KavelyMerkki m) => new Vector3((float)m.X, (float)m.Y, (float)-m.Z);

        public static void Luo(KavelyData d, Transform isa, Action<string> kirjaa)
        {
            Poista();
            KavelyMerkki km = null, p1 = null, mk4 = null, mk5 = null, mv = null, mko = null;
            foreach (var m in d.Merkit)
            {
                if (m.Nimi == "koysi:krampi-komero") km = m; else if (m.Nimi == "reitti:pako-1") p1 = m; else if (m.Nimi == "kamera:K4") mk4 = m;
                else if (m.Nimi == "kamera:K5") mk5 = m; else if (m.Nimi == "vene:pako") mv = m; else if (m.Nimi == "koysi:vene-kiinnitys") mko = m;
            }
            if (km == null || p1 == null) return;
            var go = new GameObject("Seikkailu pako") { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(isa, false);
            var s = go.AddComponent<SeikkailuPako>(); s.kirjaa = kirjaa; Aktiivinen = s;
            s.krampi = U(km); s.pako1 = U(p1);
            if (mk4 != null) { s.k4 = U(mk4); s.k4Katse = mk4.Katse != null ? new Vector3((float)mk4.Katse[0], (float)mk4.Katse[1], (float)-mk4.Katse[2]) : s.k4 + Vector3.forward; s.k4On = true; }
            if (mk5 != null) { s.k5 = U(mk5); s.k5Katse = mk5.Katse != null ? new Vector3((float)mk5.Katse[0], (float)mk5.Katse[1], (float)-mk5.Katse[2]) : s.k5 + Vector3.forward; s.k5On = true; }
            if (mv != null) { s.vene = U(mv); s.veneOn = true; }
            s.koysi = mko != null ? U(mko) : s.vene;
            SeikkailuKomero.ArkkuAuki -= s.Halytyskello; SeikkailuKomero.ArkkuAuki += s.Halytyskello;
            kirjaa?.Invoke($"seikkailu: pako (K4 {(s.k4On ? "kyllä" : "ei")}, vene {(s.veneOn ? "kyllä" : "ei")})");
        }

        void Halytyskello()
        {
            if (vaihe != Vaihe.Odottaa) return;
            vaihe = Vaihe.Kello; kello = Time.time;
            SeikkailuAanet.Soita("kello", krampi + Vector3.up * 6f, 1f);   // hälytyskello Kellotornissa (TULKINTA; ääni aanet-fp:hen tarvittaessa)
            SeikkailuVartijat.Valpastu();
            kirjaa?.Invoke("seikkailu: hälytyskello soi, vartijat valppaina");
        }

        /// <summary>Toimintonapin verbi kävellessä (Kiinnitä krampin luona kellon jälkeen) tai null.</summary>
        public string Verbi(SeikkailuPelaaja p) => vaihe == Vaihe.Kello && p != null && (p.transform.position + Vector3.up - krampi).sqrMagnitude < KramppiM * KramppiM * 2f ? "Kiinnitä" : null;

        public bool Toimi(SeikkailuPelaaja p)
        {
            if (Verbi(p) == null) return false;
            // Köysilasku: otteet 1 m:n välein krampista kallion yläpäähän (keho riippuu otteesta 1,55 m), ulospäin kohti kalliota.
            var ala = pako1 + Vector3.up * SeikkailuPelaaja.OteRiippuu;
            var ulos = pako1 - krampi; ulos.y = 0; ulos = ulos.sqrMagnitude > 1e-4f ? ulos.normalized : Vector3.forward;
            int n = Mathf.Max(2, Mathf.CeilToInt(Vector3.Distance(krampi, ala)));
            var otteet = new List<(Vector3 P, Vector3 Ulos)>();
            for (int i = 0; i <= n; i++) otteet.Add((Vector3.Lerp(krampi, ala, i / (float)n), ulos));
            p.KasiEle("poiminta");
            SeikkailuAanet.Soita("lyhty-narina", krampi, 0.6f, 0.7f);
            vaihe = Vaihe.Lasku;
            kirjaa?.Invoke($"seikkailu: köysi kramppiin → köysilasku ({n} m)");
            p.AloitaOteKiipeily(otteet, null, ok => { vaihe = Vaihe.Kallio; kirjaa?.Invoke("seikkailu: kalliolla"); }, "koysilasku");
            return true;
        }

        void Update()
        {
            var p = SeikkailuPelaaja.Aktiivinen; if (p == null) return;
            float kulunut = kello >= 0 ? Time.time - kello : 0f;
            if (vaihe == Vaihe.Kallio)
            {
                if (kulunut > RantaEsiinS) SeikkailuVartijat.Aktivoi("ranta");
                if (kulunut > MyohassaS) { kirjaa?.Invoke("seikkailu: pako myöhästyi"); vaihe = Vaihe.Kello; SeikkailuVartijat.Halyta(); return; }
                if (k4On && new Vector2(p.transform.position.x - k4.x, p.transform.position.z - k4.z).sqrMagnitude < K4M * K4M) AloitaSukellus(p);
            }
        }

        void AloitaSukellus(SeikkailuPelaaja p)
        {
            vaihe = Vaihe.K4; t = 0f;
            kirjaa?.Invoke("seikkailu: K4 sukellus");
            var alku = p.transform.position;
            var vesi = veneOn ? vene.y : alku.y - 1f;
            var uintiAlku = new Vector3(k4Katse.x, vesi, k4Katse.z);
            if (veneOn) uintiAlku = Vector3.Lerp(new Vector3(alku.x, vesi, alku.z), vene, 0.25f);
            p.Ohjattu = dt =>
            {
                t += dt;
                switch (vaihe)
                {
                    case Vaihe.K4:
                        // Kaukokuva K4: sukellus salmeen kallion juurelta (hahmo pieni kuvassa).
                        p.Kuva(k4, k4Katse);
                        p.transform.position = Vector3.Lerp(alku, uintiAlku - Vector3.up * 1.4f, Mathf.SmoothStep(0f, 1f, t / K4S));
                        if (t >= K4S) { vaihe = Vaihe.Uinti; t = 0f; SeikkailuAanet.Soita("vesisanko", p.transform.position, 0.9f, 0.6f); }
                        return true;
                    case Vaihe.Uinti:
                        {
                            // Uinti takakuvassa veneelle (virta kuljettaa); silmät vesirajassa.
                            var kohde = veneOn ? vene - (vene - uintiAlku).normalized * 1.2f : uintiAlku + Vector3.forward * 10f;
                            var pos = Vector3.Lerp(uintiAlku, kohde, t / UintiS) - Vector3.up * 1.4f;
                            p.transform.position = pos;
                            var suunta = kohde - uintiAlku; suunta.y = 0; suunta = suunta.sqrMagnitude > 1e-4f ? suunta.normalized : Vector3.forward;
                            p.Hahmo.rotation = Quaternion.LookRotation(suunta);
                            p.AsetaLeike("uinti");
                            p.Kuva(pos - suunta * SeikkailuPelaaja.TakaM + Vector3.up * (SeikkailuPelaaja.Korkeus + SeikkailuPelaaja.TakaYlos), pos + Vector3.up * 1.4f + suunta * 2f);
                            if (t >= UintiS) { vaihe = Vaihe.Koysi; t = 0f; AsetaKoysi(true); kirjaa?.Invoke("seikkailu: veneellä, vartija pitää köydestä"); }
                            return true;
                        }
                    case Vaihe.Koysi:
                        // Soutaja nostaa veneeseen (ensimmäinen persoona veneessä); vartija pitää kiinnitysköydestä: Katkaise.
                        p.transform.position = vene;
                        p.Kuva(vene + Vector3.up * 1.0f, koysi, false);
                        if (t > KoysiS * 2f) Katkaise();   // armo: soutaja irrottaa itse (ei jumia)
                        return true;
                    case Vaihe.K5:
                        // Kaukokuva K5: virta vie veneen sumuun → drone (sovitin).
                        p.Kuva(k5On ? k5 : vene + new Vector3(10f, 6f, 10f), k5On ? k5Katse : vene, true);
                        if (k5On) p.transform.position = Vector3.Lerp(vene, k5Katse, Mathf.Clamp01(t / K5S) * 0.15f);
                        if (t >= K5S) { vaihe = Vaihe.Valmis; SeikkailuNakyvyys.Himmennys = 1f; kirjaa?.Invoke("seikkailu: PAKO VALMIS"); Valmis?.Invoke(); return false; }
                        return true;
                }
                return false;
            };
        }

        void AsetaKoysi(bool paalla) { OhjattuVerbi = paalla ? "Katkaise" : null; OhjattuToimi = paalla ? (Action)Katkaise : null; }

        void Katkaise()
        {
            if (vaihe != Vaihe.Koysi) return;
            AsetaKoysi(false);
            SeikkailuAanet.Soita("raapaisu", koysi, 0.9f, 0.8f);
            SeikkailuAanet.Soita("vesisanko", koysi, 0.7f, 0.9f);   // vartija istahtaa matalaan veteen vahingoittumatta (omistajan päätös 1)
            kirjaa?.Invoke("seikkailu: köysi katkaistu → K5");
            vaihe = Vaihe.K5; t = 0f;
        }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); OhjattuVerbi = null; OhjattuToimi = null; }
        void OnDestroy() { SeikkailuKomero.ArkkuAuki -= Halytyskello; if (Aktiivinen == this) { Aktiivinen = null; OhjattuVerbi = null; OhjattuToimi = null; } }
    }
}
