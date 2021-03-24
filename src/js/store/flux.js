const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contacDel: 0,
			GetContact: [],
			idDelete: 0,
			PostOrPut: "POST",
			idChange: "",
		},
		actions: {
			setGetContact: (contact)=>{
				const store = getStore();
				setStore({GetContact: store.GetContact.concat(contact)});
			},
			setContacDel: ()=>{
				const store = getStore();
				setStore({contacDel: store.contacDel+1});
			},
			setIdDelete:(id)=>{
				const store = getStore();
				setStore({idDelete: id})
			},
			setPut:(id)=>{
				const store = getStore();
				setStore({PostOrPut: "PUT"});
				setStore({idChange: id});
			},
			setPost:()=>{
				const store = getStore();
				setStore({PostOrPut: "POST"});
				setStore({idChange: ""});
			}
		}
	};
};

export default getState;
