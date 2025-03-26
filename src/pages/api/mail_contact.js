import { mailOptions, transporter } from "config/nodemailer";

export default async (req, res) => {
    if (req.method === "POST") {
        const data = JSON.parse(req.body);

        if (!data.name || !data.email || !data.message) {
            return res.status(400).json({ message: "Bad Request" });
        }

        try {

            await transporter.sendMail({
                ...mailOptions,
                subject: "Sharpeyetrading Mesaj Kutusu",
                html: `<a>Email: ${data.email}</a><br/><a>İsim: ${data.name}</a><br/><a>Açıklama: ${data.message}</a>`,
            })

        }
        catch (err) {
            console.log(err.message)
            res.status(500).json({ message: "Internal Server Error" });
        }

    }
    return res.status(400).json({ message: "Bad Request" });
}

