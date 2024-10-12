import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mail, Lock, AlertCircle } from "lucide-react"

// Importa o Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js"

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA2cvNcKmo4lHz3IqfYNhnmM8URsmy7Ves",
    authDomain: "financerto-7ff52.firebaseapp.com",
    projectId: "financerto-7ff52",
    storageBucket: "financerto-7ff52.appspot.com",
    messagingSenderId: "120108726325",
    appId: "1:120108726325:web:f0b4d64c44da47f7e0597c",
    measurementId: "G-4BCMRV8S9L"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginPage() {
    const [notification, setNotification] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // Verifica o estado de autenticação do usuário
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setNotification("Você está logado!");
                // Redirecionar ou executar outra lógica aqui, se necessário
            } else {
                setIsLoggedIn(false);
            }
        });
        return () => unsubscribe(); // Limpa o listener ao desmontar o componente
    }, []);

    const handleLogin = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setNotification("Login realizado com sucesso!");
        } catch (error) {
            setNotification("Erro ao realizar login: " + error.message);
        }
    };

    const handleRegister = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setNotification("Cadastro realizado com sucesso!");
        } catch (error) {
            setNotification("Erro ao realizar cadastro: " + error.message);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, isLogin: boolean) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (isLogin) {
            handleLogin(email, password);
        } else {
            handleRegister(email, password);
        }

        // Limpar a notificação após 3 segundos
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Bem-vindo</CardTitle>
                    <CardDescription className="text-center">Faça login ou crie uma conta</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <form onSubmit={(e) => handleSubmit(e, true)}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email-login">Gmail</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <Input name="email" id="email-login" type="email" placeholder="seu@gmail.com" className="pl-10" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password-login">Senha</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <Input name="password" id="password-login" type="password" className="pl-10" required />
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full">Entrar</Button>
                                </div>
                            </form>
                        </TabsContent>
                        <TabsContent value="cadastro">
                            <form onSubmit={(e) => handleSubmit(e, false)}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email-cadastro">Gmail</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <Input name="email" id="email-cadastro" type="email" placeholder="seu@gmail.com" className="pl-10" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password-cadastro">Senha</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <Input name="password" id="password-cadastro" type="password" className="pl-10" required />
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full">Cadastrar</Button>
                                </div>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter>
                    {notification && (
                        <Alert variant="default" className="w-full">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Notificação</AlertTitle>
                            <AlertDescription>{notification}</AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
          }
