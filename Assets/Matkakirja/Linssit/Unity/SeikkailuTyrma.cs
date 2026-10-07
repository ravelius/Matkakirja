// HISTORIAMOOTTORI: TYRMÄ UNITYSSA (Siirtoseppä 7.10.2026; pelattavuusmalli 4.1 muunnelma 1; ydin Seikkailu.Tyrma; LR v44n osa
// tyrma-E101). Kiinnijäännin himmennyksen jälkeen pelaaja herää oljilta (istuu:pelaaja-tyrma, silmät 1,0 m, katse kierto_y:n suuntaan),
// valoa vain ilmaraosta. 3 s: Pulu kujertaa ilmaraosta ja avaimet (esine:avainnippu-tyrma) putoavat olkiin → poimi → "Avaa" ovella
// (ovi:tyrma, avain-lukko) → käytävän pää (ovi:tyrma-ulos) → himmennys ja viimeisin tarkistuspiste valppaana. 20 s ilman tekoa → Pulun
// vihje, 60 s → Pulu avaa oven. Ei puhetta ensimmäisessä palassa. Puuttuvat merkit → vanha kulku (suoraan tarkistuspisteeseen).
using System;
using System.Collections;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuTyrma : MonoBehaviour
    {
        public static SeikkailuTyrma Aktiivinen { get; private set; }
        public const float OviM = 1.5f, UlosM = 1.2f;
        readonly Tyrma ydin = new Tyrma();
        Vector3 istuin, rako, avaimet, ovi, ulos; float katse;
        Action valmis; Action<string> kirjaa; string avainId;
        public Tyrma Ydin => ydin;

        /// <summary>Aloittaa tyrmän, jos merkit ovat datassa; muuten false (kutsuja palaa suoraan tarkistuspisteeseen).</summary>
        public static bool Aloita(Transform isa, SeikkailuPelaaja p, Action valmis, Action<string> kirjaa)
        {
            var d = SeikkailuKavely.Data; if (d == null || p == null) return false;
            KavelyMerkki M(string n) { foreach (var m in d.Merkit) if (m.Nimi == n) return m; return null; }
            Vector3 U(KavelyMerkki m) => new Vector3((float)m.X, (float)m.Y, (float)-m.Z);
            var mi = M("istuu:pelaaja-tyrma"); var mo = M("ovi:tyrma"); var mu = M("ovi:tyrma-ulos");
            if (mi == null || mo == null || mu == null) return false;
            Poista();
            var go = new GameObject("Seikkailu tyrmä"); go.transform.SetParent(isa, false);
            var t = go.AddComponent<SeikkailuTyrma>();
            t.istuin = U(mi); t.ovi = U(mo); t.ulos = U(mu); t.valmis = valmis; t.kirjaa = kirjaa;
            t.rako = M("ilmarako:tyrma") is KavelyMerkki mr ? U(mr) : t.istuin + Vector3.up * 2f;
            var ma = M("esine:avainnippu-tyrma"); t.avainId = ma?.Tunnus; t.avaimet = ma != null ? U(ma) : t.istuin + Vector3.right * 2f;
            t.katse = mi.KiertoY is double ky ? (float)(-ky * 180 / Math.PI) : 0f;
            Aktiivinen = t;
            p.Siirra(t.istuin + Vector3.up * 0.05f); p.Tila.KameraYaw = p.Tila.HahmoYaw = t.katse; p.Tila.KameraPitch = 10;
            SeikkailuNakyvyys.Himmennys = 0f;
            if (SeikkailuVihjeet.Aktiivinen != null) SeikkailuVihjeet.Aktiivinen.Ydin.Tyrmassa = true;
            kirjaa?.Invoke("seikkailu: tyrmä (muunnelma 1: Pulu tuo avaimet)");
            return true;
        }

        void Update()
        {
            var p = SeikkailuPelaaja.Aktiivinen; if (p == null) return;
            ydin.Paivita(Time.deltaTime);
            if (ydin.PuluPudotti)
            {
                ydin.PuluPudotti = false;
                SeikkailuAanet.Soita("pulu-kujerrus", rako, 0.9f); SeikkailuAanet.Soita("pulu-siivet", rako, 0.8f);
                if (avainId != null) SeikkailuEsineet.Aktiivinen?.Nayta(avainId, avaimet);
                SeikkailuAanet.Soita("kivi-lasku", avaimet, 0.4f, 1.6f);   // avaimet kilahtavat olkiin
                kirjaa?.Invoke("seikkailu: tyrmä: Pulu pudotti avaimet");
            }
            if (ydin.Vihje) { ydin.Vihje = false; SeikkailuVihjeet.Aktiivinen?.Pakota(2, "tyrmä 20 s"); }
            if (ydin.Vaihe == TyrmanVaihe.AvaimetOlissa && avainId != null && SeikkailuEsineet.Aktiivinen?.Kadessa == avainId) ydin.Poimi();
            if (ydin.PuluAvasi) { ydin.PuluAvasi = false; SeikkailuAanet.Soita("avain-lukko", ovi + Vector3.up, 0.8f); kirjaa?.Invoke("seikkailu: tyrmä: Pulu avasi oven (60 s)"); }
            if (ydin.Vaihe == TyrmanVaihe.OviAuki && Vector3.Distance(p.transform.position, ulos) < UlosM && ydin.Ulos()) StartCoroutine(Ulos());
        }

        /// <summary>Toimintonappi ovella avaimet kädessä (SeikkailuEsineet kysyy verbin ja kutsuu).</summary>
        public bool OviLahella(SeikkailuPelaaja p) => ydin.Vaihe == TyrmanVaihe.AvaimetKadessa && p != null && Vector3.Distance(p.transform.position, ovi) < OviM;

        public void AvaaOvi(SeikkailuPelaaja p)
        {
            if (!OviLahella(p) || !ydin.AvaaOvi()) return;
            p.KasiEle("luukku");
            SeikkailuAanet.Soita("avain-lukko", ovi + Vector3.up, 0.8f);
            if (avainId != null) SeikkailuEsineet.Aktiivinen?.Piilota(avainId);
            kirjaa?.Invoke("seikkailu: tyrmä: ovi auki");
        }

        IEnumerator Ulos()
        {
            SeikkailuNakyvyys.Himmennys = 1f;
            yield return new WaitForSecondsRealtime(SeikkailuNakyvyys.HimmennysS);
            kirjaa?.Invoke($"seikkailu: tyrmästä ulos {ydin.Aika:F0} s:ssa");
            if (SeikkailuVihjeet.Aktiivinen != null) SeikkailuVihjeet.Aktiivinen.Ydin.Tyrmassa = false;
            valmis?.Invoke();
            yield return new WaitForSecondsRealtime(0.3f);
            SeikkailuNakyvyys.Himmennys = 0f;
            Destroy(gameObject);
        }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }
        void OnDestroy() { if (Aktiivinen == this) Aktiivinen = null; }
    }
}
