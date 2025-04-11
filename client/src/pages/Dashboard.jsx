useEffect(() => {
    healthCheck().then(res => console.log(res.data));
  }, []);
  