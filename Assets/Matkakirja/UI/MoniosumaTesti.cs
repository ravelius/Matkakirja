// MONIOSUMATESTI (omistaja 9.10.2026, juna 170: "vapaassa ohjauksessa kumpikin joystick liike pitää pystyä toteuttamaan yhtäaikaa,
// esim. alaspäin ja eteenpäin meno yhtäaikaa"; Päätoimittajan erä). Kaksi oikeaa kosketusta Input Systemin kautta
// (InputSystem.QueueStateEvent Touchscreenille kuten HiiriTesti hiirelle): sormi 1 vasempaan ja sormi 2 oikeaan tappiin samassa
// ruudussa, molemmat liikkuvat yhtä aikaa (vasen ylös = eteen, oikea alas = lasku), sitten vinottain, lopuksi irti. UI Toolkit tekee
// saman osumatestin ja pointerId-kaappauksen kuin oikeilla sormilla. Tulos lokiin (MATKAKIRJA moniosuma) ja Viimeisin-kenttään:
// ok = molempien tappien arvot yhtä aikaa oikeinpäin ja irrotuksen jälkeen nollat. Laitteen oikea kosketus ei liiku (testisormien
// touchId 9001/9002). Ilman kosketusnäyttöä (Mac) lisätään väliaikainen Touchscreen ja poistetaan lopuksi.
//   ui opasvalikko moniosuma [tulos]
using System;
using System.Collections;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.LowLevel;
using UnityEngine.UIElements;
using Kosketus = UnityEngine.InputSystem.TouchPhase;

namespace Matkakirja.Natiivi
{
    public static class MoniosumaTesti
    {
        const int Sormi1 = 9001, Sormi2 = 9002;
        /// <summary>Viimeisimmän ajon tulos ("ok …" / "VIKA …") tai "-".</summary>
        public static string Viimeisin { get; private set; } = "-";
        public static bool Kaynnissa { get; private set; }

        /// <summary>Paneelipiste (pt, y alas) näytön pikseleiksi (y ylös) paneelin mittakaavalla (HiiriTesti.Ruutuun).</summary>
        static Vector2 Ruutuun(VisualElement viite, Vector2 pt)
        {
            float w = viite?.panel != null ? viite.panel.visualTree.layout.width : 0f;
            float s = w > 0f ? Screen.width / w : 1f;
            return new Vector2(pt.x * s, Screen.height - pt.y * s);
        }

        /// <summary>
        /// Aja testi: a ja b tappien laatikot (paneelin pt), lue() palauttaa (vasen, oikea, kosketaan). Palauttaa heti; tulos lokiin.
        /// </summary>
        public static string Aja(MonoBehaviour ajaja, VisualElement viite, Rect a, Rect b, Func<(Vector2 vasen, Vector2 oikea, bool kosketaan)> lue)
        {
            if (Kaynnissa) return "moniosuma: käynnissä jo";
            if (a.width <= 0f || b.width <= 0f) return "moniosuma: tapit piilossa (avaa vapaa lento tai pysähdys ensin)";
            Kaynnissa = true;
            Viimeisin = "kesken";
            ajaja.StartCoroutine(Kulku(viite, a, b, lue));
            return $"moniosuma: käynnissä, vasen {a.center.x:0},{a.center.y:0} ja oikea {b.center.x:0},{b.center.y:0} pt";
        }

        static void Tila(Touchscreen n, int id, Kosketus vaihe, Vector2 px) =>
            InputSystem.QueueStateEvent(n, new TouchState { touchId = id, phase = vaihe, position = px, pressure = 1f, radius = new Vector2(20f, 20f) });

        static IEnumerator Kulku(VisualElement viite, Rect a, Rect b, Func<(Vector2 vasen, Vector2 oikea, bool kosketaan)> lue)
        {
            bool lisatty = Touchscreen.current == null;
            var n = Touchscreen.current ?? InputSystem.AddDevice<Touchscreen>();
            float ra = a.width * 0.5f, rb = b.width * 0.5f;
            Vector2 A(Vector2 d) => Ruutuun(viite, a.center + d * ra);
            Vector2 B(Vector2 d) => Ruutuun(viite, b.center + d * rb);
            string vaihe1 = "-", vaihe2 = "-", loppu = "-";
            bool ok1 = false, ok2 = false, okLoppu = false;
            try
            {
                // Molemmat sormet alas samassa ruudussa tappien keskelle.
                Tila(n, Sormi1, Kosketus.Began, A(Vector2.zero));
                Tila(n, Sormi2, Kosketus.Began, B(Vector2.zero));
                yield return null; yield return null;
                // Vaihe 1: vasen ylös (eteen) ja oikea alas (lasku) yhtä aikaa (paneelissa y alas: ylös = −y).
                for (int i = 1; i <= 4; i++)
                {
                    Tila(n, Sormi1, Kosketus.Moved, A(new Vector2(0f, -0.2f * i)));
                    Tila(n, Sormi2, Kosketus.Moved, B(new Vector2(0f, 0.2f * i)));
                    yield return null;
                }
                yield return null;
                var (v, o, k) = lue();
                ok1 = k && v.y > 0.6f && Mathf.Abs(v.x) < 0.2f && o.y < -0.6f && Mathf.Abs(o.x) < 0.2f;
                vaihe1 = $"vasen {v.x:0.00},{v.y:0.00} oikea {o.x:0.00},{o.y:0.00} kosketaan {k}";
                // Vaihe 2: vasen vinottain oikealle eteen, oikea vasemmalle ylös (kääntö + nousu) yhtä aikaa.
                Tila(n, Sormi1, Kosketus.Moved, A(new Vector2(0.6f, -0.6f)));
                Tila(n, Sormi2, Kosketus.Moved, B(new Vector2(-0.6f, -0.6f)));
                yield return null; yield return null;
                (v, o, k) = lue();
                ok2 = k && v.x > 0.4f && v.y > 0.4f && o.x < -0.4f && o.y > 0.4f;
                vaihe2 = $"vasen {v.x:0.00},{v.y:0.00} oikea {o.x:0.00},{o.y:0.00}";
                // Irti: molemmat nollaan.
                Tila(n, Sormi1, Kosketus.Ended, A(new Vector2(0.6f, -0.6f)));
                Tila(n, Sormi2, Kosketus.Ended, B(new Vector2(-0.6f, -0.6f)));
                yield return null; yield return null;
                (v, o, k) = lue();
                okLoppu = !k && v == Vector2.zero && o == Vector2.zero;
                loppu = $"vasen {v.x:0.00},{v.y:0.00} oikea {o.x:0.00},{o.y:0.00} kosketaan {k}";
            }
            finally
            {
                if (lisatty && n != null && n.added) InputSystem.RemoveDevice(n);
                Kaynnissa = false;
            }
            Viimeisin = $"{(ok1 && ok2 && okLoppu ? "ok" : "VIKA")}: eteen+lasku [{vaihe1}] {(ok1 ? "ok" : "VIKA")}; vino+kääntö [{vaihe2}] "
                      + $"{(ok2 ? "ok" : "VIKA")}; irti [{loppu}] {(okLoppu ? "ok" : "VIKA")}{(lisatty ? " (väliaikainen kosketusnäyttö)" : "")}";
            Debug.Log("MATKAKIRJA moniosuma: " + Viimeisin);
        }
    }
}
