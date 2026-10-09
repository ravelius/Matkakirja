// KAUKOKUVA K3 (pelattavuusmalli 7, huone 7 alku; Pulu poistettu 8.10. → ilman lintua): kun pelaaja astuu muurikäytävään toisesta
// osasta, kamera näyttää 5 s kaukokuvan merkistä kamera:K3 (paikka, katse; Linnanrakentaja) — muurikäytävä ja Kellotorni soihtujen
// valossa, hahmo pienenä. Hidas sivuttaisliuku, ohitettavissa napautuksella tai näppäimellä. Ilman merkkiä ei mitään.
// Tallennuksesta jatkettaessa ei näytetä (siirtymä vaatii edellisen osan). Vartijat eivät havaitse ohjatun jakson aikana.
using UnityEngine;
using UnityEngine.InputSystem;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Natiivi
{
    public static class SeikkailuKaukokuva
    {
        public const string Osa = "muurikaytava";
        public const float KestoS = 5f, LiukuM = 1.5f;
        static string edellinen; static bool nahty;

        public static void Nollaa() { edellinen = null; nahty = false; }

        public static void Paivita(SeikkailuPelaaja p)
        {
            var d = SeikkailuKavely.Data; if (d == null || p == null || p.Ohjataan || nahty) return;
            var pp = p.transform.position;
            string osa = Askelaani.Osa(d, pp.x, pp.y, -pp.z);
            if (osa == null) return;
            bool siirtyi = edellinen != null && edellinen != osa && osa == Osa;
            edellinen = osa;
            if (!siirtyi) return;
            KavelyMerkki k3 = null;
            foreach (var m in d.Merkit) if (m.Nimi == "kamera:K3") { k3 = m; break; }
            if (k3 == null) return;
            nahty = true;
            var paikka = new Vector3((float)k3.X, (float)k3.Y, (float)-k3.Z);
            var katse = k3.Katse != null ? new Vector3((float)k3.Katse[0], (float)k3.Katse[1], (float)-k3.Katse[2]) : pp;
            var sivu = Vector3.Cross(Vector3.up, (katse - paikka).normalized);
            var alku = p.transform.position;
            float t = 0f;
            Debug.Log("MATKAKIRJA seikkailu: kaukokuva K3 (muurikäytävä)");
            p.Ohjattu = dt =>
            {
                t += dt;
                bool ohita = t > 0.4f && ((Touchscreen.current?.primaryTouch.press.wasPressedThisFrame ?? false)
                    || (Keyboard.current?.anyKey.wasPressedThisFrame ?? false) || (Gamepad.current?.buttonSouth.wasPressedThisFrame ?? false));
                if (t >= KestoS || ohita) return false;
                float u = Mathf.SmoothStep(0f, 1f, t / KestoS);
                p.transform.position = alku;
                p.Kuva(paikka + sivu * (u - 0.5f) * LiukuM, katse, true);
                return true;
            };
        }
    }
}
