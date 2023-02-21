import React, { Component } from 'react'

export interface IComProps {
    /**
     * 附加的 CSS Class 
     */
    className: string;
    /**
     * style 样式
     */
    style:React.CSSProperties;
}

export interface IComState{
    visible:boolean;
}
